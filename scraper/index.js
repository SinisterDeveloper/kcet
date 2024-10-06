import mongoose  from 'mongoose';
import scrape  from './scraper.js';
import {MONGO_URI, DATABASE_NAME, ResultSchema, STREAM, FETCH_ONLY_VALID} from './constants.js';
if (typeof FETCH_ONLY_VALID !== 'boolean') {
	console.log('FETCH_ONLY_VALID must be either true or false!');
	process.exit(1);
}

mongoose
	.connect(MONGO_URI, {
		dbName: DATABASE_NAME,
	})
	.then(() => {
		console.log(`Established Connection with Database! Initialising Scraper to fetch "${STREAM}" data...`);

		scrape(ResultSchema, !FETCH_ONLY_VALID);

	})
	.catch((error) => console.log(error));