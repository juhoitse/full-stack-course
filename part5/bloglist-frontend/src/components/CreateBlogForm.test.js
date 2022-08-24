import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('<CreateBlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()

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



  const addMock = jest.fn()

  render(<CreateBlogForm title={blog.title} author={blog.author} url={blog.url} addblog={addMock}
                         titleHandler={jest.fn()} authorHandler={jest.fn()} urlHandler={jest.fn()}/>)

  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.click(sendButton)
})
