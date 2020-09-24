import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from 'reactstrap'
import logo from './logo.png'



const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
return (
  <Router>
      <div>
        <Navbar  color="gainsboro" light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
  <NavbarBrand>
  <img
        src={logo}
        width="50"
        height="50"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
        to="/"
        
      />
  </NavbarBrand>
              
              <NavItem className='d-flex'>
                <NavLink className='d-flex justify-content-center'><Link to="/">Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='navlink'><Link to="/login">Login/Signup</Link></NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          
        </Switch>
      </div>
    </Router>


  )
}

export default App