const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	await response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body

	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

	if(body.title && body.author && body.url) {
		const blog = new Blog({
			title: body.title,
			author: body.author,
			user: user._id,
			url: body.url,
			likes: body.likes || 0
		})
		const result = await blog.save()
		response.status(201).json(result)
	} else {
		response.status(400).end()
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	const id = request.params.id
	await Blog.deleteOne({ _id: id})
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	if(body.title && body.author && body.url) {
		const blog = new Blog({
			_id: request.params.id,
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0
		})
		const result = await Blog.findOneAndUpdate({ _id: request.params.id }, blog, {runValidators: true})
		response.status(200).json(result)
	} else {
		response.status(400).end()
	}
})

module.exports = blogsRouter
