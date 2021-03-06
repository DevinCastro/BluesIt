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
import Scrollup from './components/Scrollup/Scrollup';

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
      <link href='https://fonts.googleapis.com/css?family=Arvo' rel='stylesheet'></link>
      <link href='https://fonts.googleapis.com/css?family=Brawler' rel='stylesheet'></link>
      <div>
        <Navbar color="gainsboro" light expand="md">
          <NavbarToggler className="blue" onClick={toggle} />
          <Collapse className="topNav" isOpen={isOpen} navbar>
            <Nav className="topNav" navbar>
              <img
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                to="/"
              />
              <NavItem className="justify-content-end">
                <NavLink activeClassName="navLink"><Link id="home" to="/">Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link id="loginSignup" to="/login">Login/Signup</Link></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Nav>
            <Button className="float-right logout" onClick={logOut}>Logout</Button>
            {
              imageState.image ?
                <img className="profilePhoto float-right" src={imageState.image} />
                : null
            }
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/thread/:id" component={Thread} />
          <Route exact path="/api/users/register" component={Login} />
        </Switch>
      </div>
      <ToastContainer limit={1} />
      <div className="App">
        <Scrollup />
      </div>
      <footer className="text-center sticky-bottom">
        <p>
          Created by: <a href="https://github.com/DevinCastro" target="_blank">Devin Castro</a>, <a href="https://github.com/daniellehillman" target="_blank">Danielle Hillman</a>, <a href="https://github.com/brianra2nil" target="_blank">Brian Ratunil</a>, <a href="https://github.com/Kennsters" target="_blank">Kenny Yang</a>
        </p>
        <p>
          Powered by: MongoDB, Express, React, Node
        <br></br>
        </p>
        <br></br>
        <br></br>
      </footer>
    </Router>
  )
}

export default App