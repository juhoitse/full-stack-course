import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      username: 'test123',
      name: 'name123',
      id: 0
    }
  }

  const likeHandler = jest.fn()

  const deleteHandler = jest.fn()

  render(<Blog blog={blog} handleLike={likeHandler} handleDelete={deleteHandler} />)

  const title = screen.getByText('title author')
  expect(title).toBeDefined()
})

test('shows details', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      username: 'test123',
      name: 'name123',
      id: 0
    }
  }

  const likeHandler = jest.fn()

  const deleteHandler = jest.fn()

  render(<Blog blog={blog} handleLike={likeHandler} handleDelete={deleteHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const url = screen.getByText(blog.url)
  const likes = screen.getByText('likes '+blog.likes)
  const name = screen.getByText(blog.user.name)

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(name).toBeDefined()
})

test('clicking like button twice likes twice', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      username: 'test123',
      name: 'name123',
      id: 0
    }
  }

  let count = 0

  const likeHandler = () => {
    const handler = () => {
      count++
    }
    return handler
  }

  const deleteHandler = jest.fn()

  render(<Blog blog={blog} handleLike={likeHandler} handleDelete={deleteHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const like = screen.getByText('like')
  await user.click(like)
  await user.click(like)

  expect(count).toBe(2)
})
