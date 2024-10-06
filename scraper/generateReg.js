export default function generateScrapeList() {
	let scrapeList = [];
	const start = Date.now();
	const alphabets = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
	for (const outer of alphabets) {
		for (const inner of alphabets) {
			for (let i = 0; i <= 999; i++) {
				const str = i.toString().padStart(3, '0');
				scrapeList.push(`${outer}${inner}${str}`);
			}
		}
	}
	console.log(`Time taken to generate scrape list (in ms): `, Date.now() - start);
	return scrapeList;
}
