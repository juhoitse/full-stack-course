const Login = ({ login, username, pw, pwHandler, usernameHandler}) => {
  return (
    <form id='login-form' onSubmit={login}>
      <div>
        username: <input id='username' value={username} onChange={usernameHandler} />
      </div>
      <div>
        password: <input id='password' type='password' value={pw} onChange={pwHandler} />
      </div>
      <div>
        <button id='login-button' type='submit' >login</button>
      </div>
    </form>
  )
}

export default Login
