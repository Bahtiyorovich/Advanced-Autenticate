import { Schema, model } from 'mongoose';

const postSchema = new Schema(
	{
		author: { type: Schema.ObjectId, ref: 'User' },
		title: { type: String, required: true },
		body: { type: String, required: true },
		picture: { type: String },
	},
	{ timestamps: true }
)

const postModel = model('Post', postSchema)
export default postModel;