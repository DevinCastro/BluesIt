import React, { useState } from 'react'
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
import './style.css'


const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logOut = () => {
    localStorage.removeItem('user')
   window.location = '/login'
  }


return (
  
  <Router>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"></link>
      <div>
        <Navbar color="gainsboro" light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
  <NavbarBrand>
  {/* <img
        src={logo}
        width="50"
        height="50"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
        to="/"
        class="center1"
        
      /> */}
  </NavbarBrand>
  <img
        src={logo}
        width="50"
        height="50"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
        to="/"
        
      />
              
              <NavItem className="justify-content-end">
                <NavLink><Link to="/">Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/login">Login/Signup</Link></NavLink>
              </NavItem>
              {/* <NavItem >
                <Button id="logout" onClick={logOut}>Logout</Button>
              </NavItem>
               */}

            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/thread/:id" component={Thread} />
        </Switch>
      </div>
      <ToastContainer limit={1}/>
    </Router>


  )
}

export default App