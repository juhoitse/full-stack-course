const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)


	try {
		const user = new User({
			username: username,
			name: name,
			passwordHash: passwordHash,
		})
		//console.log(user)
		const savedUser = await user.save()
		//console.log('saved', savedUser)
		response.status(201).json(savedUser)
	} catch (error) {
		response.status(500).send('Something went wrong')
	}
})

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).select({username: 1, name: 1, id: 1}).populate('blogs', {url: 1, title: 1, author:1, id: 1})
	await response.status(200).json(users)
})

module.exports = usersRouter
