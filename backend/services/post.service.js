import postModel from '../models/post.model.js';
import fileService from './file.service.js';

class PostService {
	async create(post, picture, author) {
		const fileName = fileService.save(picture)
		const newPost = await postModel.create({ ...post, picture: fileName, author })
		return newPost
	}

	async getAll() {
		const allPosts = await postModel.find().populate('author')
		return allPosts
	}

	async delete(id) {
		const post = await postModel.findByIdAndDelete(id)
		return post
	}

	async edit(post, id) {
		if (!id) {
			throw new Error('Id not found')
		}

		const updatedData = await postModel.findByIdAndUpdate(id, post, {
			new: true,
		})
		return updatedData
	}

	async getOne(id) {
		const post = await postModel.findById(id)
		return post
	}
}
const postService = new PostService()
export default postService;