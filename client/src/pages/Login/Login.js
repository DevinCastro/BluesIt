import React, { useState } from 'react'
import axios from 'axios'
import { register } from '../../serviceWorker'
// import API from '../../utils/API'

const Login = () => {

  const [registerState, setRegisterState] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    lPassword: '',
    lUsername: ''
  })

  registerState.handleRegister = event => {
    event.preventDefault()
    axios.post('/api/users/register', {
      name: registerState.name,
      email: registerState.email,
      username: registerState.username,
      password: registerState.password
    })
    .then(() => {
      // console.log('Registered!')
      setRegisterState({ ...registerState, name: '', email: '', username: '', password: ''})
    })
    .catch(err => console.log(err))
  }

  registerState.handleInputChange = event => {
    setRegisterState({ ...registerState, [event.target.name]: event.target.value })
    // console.log(registerState)
  }

  registerState.handleLogin = event => {
    event.preventDefault()
    // console.log('Logged In!')
    axios.post('api/users/login', {
      username: registerState.lUsername,
      password: registerState.lPassword
    })
    .then(({ data: token }) => {
      if (token) {
        localStorage.setItem('user', token)
        console.log('login success')
        window.location = '/'
      } else {
        console.log('incorrect credentials')
      }
    })
  }

  return (
    <>
      <h1>Sign Up Page</h1>
      <form>
        <p>
          <label htmlFor="name">Name</label>
          <input type="text"
          name="name" 
          value={registerState.name}
          onChange={registerState.handleInputChange} />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input type="email"
          name="email" 
          value={registerState.email}
          onChange={registerState.handleInputChange}/>
        </p>
        <p>
          <label htmlFor="username">Username</label>
          <input type="text"
          name="username" 
          value={registerState.username}
          onChange={registerState.handleInputChange}/>
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input type="password"
          name="password" 
          value={registerState.password}
          onChange={registerState.handleInputChange}/>
        </p>
        <p>
          <button onClick={registerState.handleRegister}>Submit</button>
        </p>
      </form>
      <h1>Login</h1>
      <form>
        <p>
          <label htmlFor="lUsername">Username</label>
          <input type="text"
          name="lUsername" 
          value={registerState.lUsername}
          onChange={registerState.handleInputChange} />
        </p>
        <p>
          <label htmlFor="lPassword">Password</label>
          <input type="password"
          name="lPassword" 
          value={registerState.lPassword}
          onChange={registerState.handleInputChange} />
        </p>
        <p>
          <button onClick={registerState.handleLogin}>Login</button>
        </p>
      </form>
    </>
  )
}

export default Login