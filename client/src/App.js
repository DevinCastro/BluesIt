import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Thread from './pages/Thread'
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from 'reactstrap'
import logo from './logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logOut = () => {
    localStorage.removeItem('user')
    window.location = '/login'
  }

  const [imageState, setImageState] = useState({
    image: ''
  })

  useEffect(() => {
    axios.get('/api/users',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      })
      .then(({ data }) => {
        console.log(data)
        setImageState({ ...imageState, image: `data:image/png;base64, ${data.img.data}` })
      })
      .catch(err => console.log(err))

  }, [])


  return (

    <Router>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"></link>
      <div>
        <Navbar color="gainsboro" light expand="md">
          <NavbarToggler className="blue" onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <img
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                to="/"
              />
              <NavItem className="justify-content-end">
                <NavLink activeClassName="navLink"><Link to="/">Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/login">Login/Signup</Link></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
            <div>
              {
                imageState.image ? 
                <img className="profilePhoto float-right" src={imageState.image} />
                : null
              }
              <Button className="float-right logout" onClick={logOut}>Logout</Button>
            </div>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/thread/:id" component={Thread} />
          <Route path="/api/users/register" component={Login} />
        </Switch>
      </div>
      <ToastContainer limit={1} />
    </Router>


  )
}

export default App