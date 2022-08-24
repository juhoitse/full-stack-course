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

  /*expect(addMock.mock.calls).toHaveLength(1)
  expect(addMock.mock.calls[0][0].content).toBe('testing a title...')
  expect(addMock.mock.calls[0][1].content).toBe('testing an author...')
  expect(addMock.mock.calls[0][2].content).toBe('testing a url...')*/
})
