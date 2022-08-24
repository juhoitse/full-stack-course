import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = (blog, token) => {
  //console.log('token', token)
  const config = {
    headers: {
      Authorization: 'Bearer '+ token
    }
  }
  const request = axios.post(baseUrl, blog, config).then(response => response.data)
  return request
}

const like = (blog, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer '+ token
    }
  }
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1
  }
  const request = axios.put(baseUrl + '/' + blog.id, newBlog, config).then(response => response.data)
  return request
}

const remove = (blog, token) => {
  const request = axios({
                          method: 'delete',
                          url: baseUrl+'/'+blog.id,
                          headers: {
                            Authorization: 'Bearer '+token
                          }
  })
  return request
}

const funcs = {
  getAll,
  addBlog,
  like,
  remove
}

export default funcs
