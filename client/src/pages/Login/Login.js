import React, { useState } from 'react'
import axios from 'axios'
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import guitar from '../Login/guitar.png'
import guitar2 from '../Login/guitar2.png'
import GrCamera from '../../components/Camera/Camera.js'
const Login = () => {

  const [registerState, setRegisterState] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    lPassword: '',
    lUsername: '',
    image: ''
  })

  registerState.handleFile = event => {
    console.log(event.target.files[0])
    setRegisterState({ ...registerState, image: event.target.files[0] })
  }

  registerState.handleInputChange = event => {
    setRegisterState({ ...registerState, [event.target.name]: event.target.value })
  }

  registerState.handleLogin = event => {
    event.preventDefault()
    axios.post('api/users/login', {
      username: registerState.lUsername,
      password: registerState.lPassword
    })
      .then(({ data: token }) => {
        if (token) {
          localStorage.setItem('user', token)
          window.location = '/'
        } else {
          toast.error('Incorrect Credentials', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
  }

  return (
    <>
      <Container>
        <Row>
          <Col xs="6">
            <h1 className="text-center">Register</h1>
            <Form target='hidden-frame' action='/api/users/register' method='POST' encType="multipart/form-data">
              <p>
                <Label className="touch" htmlFor="name">Name</Label>
                <Input type="text"
                  name="name"
                />
              </p>
              <p>
                <Label htmlFor="email">Email</Label>
                <Input type="email"
                  name="email"
                />
              </p>
              <p>
                <Label htmlFor="username">Username</Label>
                <Input type="text"
                  name="username"
                />
              </p>
              <p>
                <Label htmlFor="password">Password</Label>
                <Input type="password"
                  name="password"
                />
              </p>
              <p>
                <Label for="exampleCustomFileBrowser"> Upload a Profile Picture </Label>
                <Input
                  className="fileBrowser"
                  type="file"
                  name="image"
                />
              </p>
              <p className="text-center">
                <Button className="grad"
                >Submit</Button>
                <p><img className="guitarpic" src={guitar} /></p>
                <ToastContainer />
              </p>
            </Form>
          </Col>
          <Col xs="6">
            <h1 className="text-center">Login</h1>
            <Form>
              <p>
                <Label htmlFor="lUsername">Username</Label>
                <Input className='input' type="text"
                  name="lUsername"
                  value={registerState.lUsername}
                  onChange={registerState.handleInputChange} />
              </p>
              <p>
                <Label htmlFor="lPassword">Password</Label>
                <Input className='input' type="password"
                  name="lPassword"
                  value={registerState.lPassword}
                  onChange={registerState.handleInputChange} />
              </p>
              <p className="text-center">
                <Button className="grad" onClick={registerState.handleLogin}>Login</Button>
              </p>
              <p><img className="guitarpic" src={guitar2} /></p>
            </Form>

          </Col>
          <iframe className="hide" name='hidden-frame'></iframe>
        </Row>
      </Container>
    </>
  )
}

export default Login