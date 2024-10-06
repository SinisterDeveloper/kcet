import * as cheerio from 'cheerio';
import { writeFileSync, readFileSync } from "fs";
import generateList from './generateReg.js';
import { STREAM, KCET_RESULTS_URL, BATCH_SIZE, validStudents } from './constants.js';

let ResultSchema;

if (STREAM !== ('ENGINEERING' || 'MEDICAL' || 'ARCHITECTURE' || 'B.SC NURSING' || 'B.PHARM')) {
	console.log('Invalid Stream Type! Please check the spelling. Allowed Streams: \'ENGINEERING\', \'MEDICAL\', \'ARCHITECTURE\', \'B.SC NURSING\', \'B.PHARM\'');
	process.exit(1);
}

/**
 *
 * @type {Map<string, string>} Mapping Failed Students with Reason
 */
let failedAttempts = new Map();

async function fetchResult(student, retried = false) {
	try {
		const form = `txtrollno=${student}&Submit=Submit`;

		const res = await (await fetch(KCET_RESULTS_URL, {
			method: 'POST',
			body: form,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': form.length,
			}
		})).text();
		const parsed = parseResult(res, student);
		if (!parsed) return;
		try {
			await ResultSchema.create(parsed);
		} catch (e) {
			failedAttempts.set(student, `Database-Save Error: ${e}`);
		}
	} catch (e) {
		console.log(`Error while fetching result for ${student}:\n`, e);

		if (!retried) {
			console.log(`Retrying for ${student}...`)
			return await fetchResult(student, true);
		}
		failedAttempts.set(student, `Fetch Error: ${e}`);
	}

}

function parseResult(result, reg) {

	const $ = cheerio.load(result);

	const data = $.extract({
		span: ['span'],
	});
	const cleanedData = data.span.map(item => item.replace(/\s+/g, ' ').trim());

	const status = cleanedData[0].trim();
	if (status.toLowerCase() !== 'congratulations') return false;

	const rankText = cleanedData[11].trim();

	let rank = rankText.split('-');

	if (rank[0].trim().toLowerCase() !== STREAM.toLowerCase()) return false;

	const name = cleanedData[6].trim();
	const clg = cleanedData[15].trim();
	const cat = cleanedData[19].trim();
	const opt = parseInt(cleanedData[21].trim());

	let feeText = cleanedData[17].trim().split('(');
	const fee = feeText[feeText.length - 1].trim().replace(/[^a-zA-Z0-9\s]/g, '').replace('Rs', '').replace(')', '');

	let courseInfo = cleanedData[17].trim().split('( Rs');
	let courseCode = courseInfo[courseInfo.length - 2]?.trimEnd()?.slice(-6);

	let courseName = courseInfo[courseInfo.length - 2].trim().slice(0, -7);

	rank = rank[rank.length - 1].trim().replace(/[^a-zA-Z0-9\s]/g, '');

	validStudents.push(reg);
	return {
		reg: reg,
		rank: rank,
		name: name,
		clg: clg,
		cat: cat,
		opt: opt,
		courseCode: courseCode,
		courseName: courseName,
		fee: parseInt(fee)
	}
}


export default async function scrape(model, force = true) {
	let students;
	if (force) students = generateList();
	else students = readFileSync('students.txt', 'utf-8')?.split('\n');

	ResultSchema = model;

	for (let i = 0; i < students.length; i += BATCH_SIZE) {
		const batch = students.slice(i, i + BATCH_SIZE);

		const promises = batch.map(async (reg) => {
			try {
				if (reg) return fetchResult(reg);
			} catch (e) {
				console.error(`Error fetching data for reg ${reg}: `, e);
				failedAttempts.set(reg, 'Fetch Error: ' + e.message);
				return null;
			}
		});

		await Promise.all(promises);

		console.log(`Batch ${i / BATCH_SIZE + 1} of ${Math.ceil(students.length / BATCH_SIZE)} scraped`);
	}

	let failedText = '';
	failedAttempts.forEach((value, key) => failedText += `${key}: ${value}\n`);
	writeFileSync('./failed.txt', failedText);
	writeFileSync('./students.txt', validStudents.map(item => item + '\n').join(''));
	console.log('Scraping process has been completed! Check the file "failed.txt" to check for any errors during the process');
	process.exit();
};
