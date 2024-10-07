import mongoose from 'mongoose';

const Client = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		default: '',
		required: true,
	},
	timestamp: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Client', Client);
