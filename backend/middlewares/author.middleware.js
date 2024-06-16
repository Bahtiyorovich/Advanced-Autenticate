import BaseError from '../errors/base.error.js';
import postModel from '../models/post.model.js';

const authorMiddleware = async (req, res, next) => {
	try {
		const post = await postModel.findById(req.params.id)
		const authorId = req.user.id
		
		if (post.author.toString() !== authorId) {
			return next(BaseError.BadRequest('Only author can edit this post'))
		}
		next()
	} catch (error) {
		return next(BaseError.BadRequest('Only author can edit this post'))
	}
}

export default authorMiddleware;