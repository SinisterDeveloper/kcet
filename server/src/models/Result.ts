import mongoose from 'mongoose';

const Result = new mongoose.Schema({
	reg: {
		type: String,
		required: true,
		unique: true,
	},
	rank: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	clg: {
		type: String,
		required: true,
	},
	cat: {
		type: String,
		required: true,
	},
	courseName: {
		type: String,
		required: true,
	},
	courseCode: {
		type: String,
		required: true,
	},
	opt: {
		type: Number,
		required: true,
	},
	fee: {
		type: Number,
		required: true,
	},
});

export default mongoose.model('round1', Result);
