const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
//const bcrypt = require('bcrypt')

const api = supertest(app)

const users = [
	{
		username: 'user1',
		name: '1user',
		password: 'user'
	},
	{
		username: 'user2',
		name: '2user',
		password: 'user'
	},
	{
		username: 'user3',
		name: '3user',
		password: 'user'
	}
]

const blogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 15,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})
	//new User(admin).save()
	for(const blog of blogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

describe('When adding a user', () => {
	test('with username, name and password user is added', async () => {
		await api.post('/api/users').send(users[0])
		const usersDB = await api.get('/api/users')
		expect(await usersDB.body.some( async (e) => {
			return (e.username === users[0].username)
		})).toBe(true)
	})

	test('with an existing username responds with an validation error', async () => {
		await api.post('/api/users').send(users[1])
		await api.post('/api/users').send(users[1])
		const newUsers = await api.get('/api/users')
		//const usersDB = await api.get('/api/users')
		//console.log(res)
		expect(newUsers.body.length).toBe(1)
	})
})

describe('When logging in', () => {
	test('with correct credentials returns a token', async () => {
		const credentials = {
			username: 'user3',
			password: 'user'
		}
		const token = await api.post('/api/login').send(credentials)

		expect(!token).toBe(false)
	})
})

describe('When making a get request', () => {
	test('blogs are returned as json', async () => {
		await api.get('/api/blogs').expect('Content-Type', /application\/json/)
		//expect('Content-Type', /application\/json/)
	})

	test('correct amount of blogs are fetched', async () => {
		const result = await api.get('/api/blogs')
		//console.log(typeof result.body)
		expect(result.body.length).toBe(blogs.length)
	})

	test('blogs have an id attribute', async () => {
		const result = await api.get('/api/blogs')
		expect(result.body[0].id).toBeDefined()
	})
})

describe('When making a post request', () => {
	test('with a new blog it adds it to db', async () => {
		await api.post('/api/users').send(users[2])
		const token = (await api.post('/api/login').send(users[2])).body.token

		const blog = {
			'title': 'testblog',
			'author': 'me',
			'url': 'blog.com',
			'likes': 69
		}
		await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
		const result = await api.get('/api/blogs')

		expect(result.body.some(e => {
			return (e.title === blog.title &&
			e.author === blog.author &&
			e.url === blog.url &&
			e.likes === blog.likes)
		}) && result.body.length === (blogs.length+1)).toBe(true)

	})

	test('with a blog without likes attribute defaults to 0 likes', async () => {
		const blog = {
			'title': 'testblog2',
			'author': 'me',
			'url': 'blog.com',
		}
		await api.post('/api/users').send(users[2])
		const token = (await api.post('/api/login').send(users[2])).body.token

		await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
		const result = await api.get('/api/blogs')
		//console.log(result.body)
		//console.log(res1)
		expect(result.body.find(e => {
			return (e.title === blog.title &&
			e.author === blog.author &&
			e.url === blog.url)
		}).likes).toBe(0)

	})

	test('and the title and the url are missing server responds status 400', async () => {
		const blog = {
			'author': 'me',
		}
		await api.post('/api/users').send(users[2])
		const token = (await api.post('/api/login').send(users[2])).body.token
		const result = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
		//console.log(result.body)
		//console.log(res1)
		expect(result.status).toBe(400)
	})

})

describe('When making a delete request', () => {
	test('it deletes the blog', async () => {
		await api.post('/api/users').send(users[2])
		const token = (await api.post('/api/login').send(users[2])).body
		const tempBlog = {
			title: 'temp',
			author: 'temp',
			url: 'temp'
		}
		//console.log(token)
		const blog = (await api.post('/api/blogs').set('Authorization', `Bearer ${token.token}`).send(tempBlog))
		const preblogs = (await api.get('/api/blogs')).body
		await api.delete(`/api/blogs/${blog.body.id}`).set('Authorization', `Bearer ${token.token}`)
		const postblogs = (await api.get('/api/blogs')).body
		expect(postblogs.length === (preblogs.length - 1)).toBe(true)
	})
})

describe('When making a put request', () => {
	test('to en existing blog it updates it', async () => {
		await api.post('/api/users').send(users[2])
		const token = (await api.post('/api/login').send(users[2])).body.token

		const dbBlogs = await api.get('/api/blogs')
		const blog = dbBlogs.body[1]
		const newBlog = {
			id: blog.id,
			title: blog.title,
			author: blog.author,
			url: 'newurl',
			likes: 100
		}
		await api.put(`/api/blogs/${blog.id}`).set('Authorization', `Bearer ${token}`).send(newBlog)
		const result = await api.get('/api/blogs')
		expect(result.body.find(e => {
			return (e.title === newBlog.title &&
			e.author === newBlog.author &&
			e.url === newBlog.url)
		})).toStrictEqual(newBlog)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
