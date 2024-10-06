import mongoose, { Schema } from 'mongoose';

// --------------------------------------------EDIT THE BELOW DETAILS ONLY-------------------------------------------------------------------

export const STREAM = 'ENGINEERING' // Options: 'ENGINEERING', 'MEDICAL', 'ARCHITECTURE', 'B.SC NURSING', 'B.PHARM'

export const KCET_RESULTS_URL = "https://keaonline.karnataka.gov.in/ugcet_result_2024/main/resultscheck.php" // URL to scrape

export const ROUND_NUMBER = 3; // KCET Allotment Round Number

export const DATABASE_NAME = 'kcet'; // Name of MongoDB Database to store the data in

export const BATCH_SIZE = 100; // Number of results to be fetched per batch before saving to database

export const MONGO_URI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0'; // MongoDB Connection URI

/**
 * Whether to utilise the existing saved roll numbers instead of scraping all possible combinations
 * NOTE: Only set to true if the program has been run in the past on 'false' and the saved roll numbers exist in the text file 'students.txt'
 */
export const FETCH_ONLY_VALID = false;
// ----------------------------------------------------------------------------------------------------------------

const Result = new Schema({
	reg: {
		type: String,
		required: true,
		unique: true
	},
	rank: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
	},
	clg: {
		type: String,
		required: true
	},
	cat: {
		type: String,
		required: true
	},
	courseName: {
		type: String,
		required: true
	},
	courseCode: {
		type: String,
		required: true
	},
	opt: {
		type: Number,
		required: true
	},
	fee: {
		type: Number,
		required: true
	}
});

export const ResultSchema = mongoose.model(`round${ROUND_NUMBER}`, Result);

export const validStudents = [];
