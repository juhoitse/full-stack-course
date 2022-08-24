const CreateBlogForm = ({title, author, url, titleHandler, authorHandler, urlHandler, addBlog}) => {
  return (
    <form onSubmit={addBlog} >
      <div>
        title: <input id='title' value={title} onChange={titleHandler} />
      </div>
      <div>
        author: <input id='author' value={author} onChange={authorHandler} />
      </div>
      <div>
        url: <input id='url' value={url} onChange={urlHandler} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default CreateBlogForm
