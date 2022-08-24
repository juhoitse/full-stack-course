import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import Message from './components/Message'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [pw, setPw] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort( (a, b) => a.likes < b.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedIn')
    //console.log('log', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
    }
  }, [])

  const usernameHandler = (event) => {
    setUsername(event.target.value)
    //console.log('un', event.target.value)
  }

  const pwHandler = (event) => {
    setPw(event.target.value)
    //console.log('pw', event.target.value)
  }

  const blogTitleHandler = (event) => {
    setBlogTitle(event.target.value)
  }

  const blogAuthorHandler = (event) => {
    setBlogAuthor(event.target.value)
  }

  const blogUrleHandler = (event) => {
    setBlogUrl(event.target.value)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, pw )
      //console.log('user', user)
      window.localStorage.setItem('loggedIn', JSON.stringify(user))
      //console.log('storage', window.localStorage.getItem('loggedIn'))
      setUser(user)
      setUsername('')
      setPw('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedIn')
    setUser(null)
  }

  const handleLike = (blog) => {
    const liker = async () => {
      try {
        await blogService.like(blog, user.token)
        blogService.getAll().then(blogs =>
          setBlogs( blogs.sort( (a, b) => a.likes < b.likes) )
        )
        //console.log('like', like)
      } catch(error) {
        console.log(error)
      }
    }
    return liker
  }

  const handleDelete = (blog) => {
    const deleter = async () => {
      try {
        if(window.confirm('Remove '+blog.title+'?')){
          await blogService.remove(blog, user.token)
          //console.log('del', del)
          blogService.getAll().then(blogs =>
            setBlogs( blogs.sort( (a, b) => a.likes < b.likes) )
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    return deleter
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.addBlog({title: blogTitle, author: blogAuthor, url: blogUrl}, user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort( (a, b) => a.likes < b.likes) )
      )
      //setBlogs(blogs.concat(blog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setMessage('A new blog ' + blogTitle + ' added')
      setTimeout( ()=> {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if(user === null) {
    return (
      <div>
        <Message message={errorMessage} error={true} />
        <Login login={handleLogin} pwHandler={pwHandler} usernameHandler={usernameHandler} username={username} pw={pw} />
      </div>
    )
  }
  return (
    <div>
      <Message message={errorMessage} error={true} />
      <Message message={message} error={false} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button type="submit" onClick={handleLogout}>logout</button>
      <ul id='blog-list'>
        {blogs.map(blog =>
          <li><Blog className='blog' key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/></li>
        )}
      </ul>
      <h2>Create a blog</h2>
      <Togglable buttonLabel={'new blog'}>
        <CreateBlogForm title={blogTitle} author={blogAuthor} url={blogUrl}
                        titleHandler={blogTitleHandler} authorHandler={blogAuthorHandler}
                        urlHandler={blogUrleHandler} addBlog={handleAddBlog}/>
      </Togglable>
    </div>
  )

}

export default App
