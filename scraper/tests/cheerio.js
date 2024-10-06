import * as cheerio from 'cheerio';

(async () => {

	const form = 'txtrollno=CS636&Submit=Submit';

	const str = await (await fetch('https://keaonline.karnataka.gov.in/ugcet_result_2024/main/resultscheck.php', {
		method: 'POST',
		body: form,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': form.length,
		}
	})).text();

	const $ = cheerio.load(str);

	const data = $.extract({
		span: ['span'],
	});
	const cleanedData = data.span.map(item => item.replace(/\s+/g, ' ').trim());

	const status = cleanedData[0].trim();
	if (status.toLowerCase() !== 'congratulations') return false;

	const rankText = cleanedData[11].trim();

	let rank = rankText.split('-');

	if (rank[0].trim().toLowerCase() !== 'engineering') return false;

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

	const ResultData = {
		reg: 'DQ929',
		rank: rank,
		name: name,
		clg: clg,
		cat: cat,
		opt: opt,
		courseCode: courseCode,
		courseName: courseName,
		fee: fee
	}
	console.log(ResultData);
})();


