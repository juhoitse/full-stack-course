import { useState } from 'react'

const Blog = ({blog, handleLike, handleDelete}) => {
  const [details, setDetails] = useState(false)

  const hideWhenVisible = { display: details ? 'none' : '' }
  const showWhenVisible = { display: details ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} >
      <div>
        {blog.title} {blog.author}
        <button type='button' onClick={() => setDetails(true)} style={hideWhenVisible}>view</button>
        <button type='button' onClick={() => setDetails(false)} style={showWhenVisible}>hide</button>
      </div>
      <ul style={showWhenVisible} className={'deets'}>
        <li> {blog.url} </li>
        <li> likes {blog.likes} <button type='button' onClick={handleLike(blog)}>like</button> </li>
        <li> {blog.user.name} </li>
        <li> <button type='button' onClick={handleDelete(blog)}>remove</button> </li>
      </ul>

    </div>
  )
}

export default Blog
