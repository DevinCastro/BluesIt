import React, { useState } from 'react'
import axios from 'axios'
// import { ToastConatiner, toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import API from '../../utils/API'
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
// import './Login.css'
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

  registerState.handleRegister = event => {
    event.preventDefault()

    // const formData = new FormData()
    // formData.append("img", registerState.image)


    // axios.post('/api/users/register', {
    //   name: registerState.name,
    //   email: registerState.email,
    //   username: registerState.username,
    //   password: registerState.password,
    //   image: formData

    // })
    // .then(() => {
    //   // console.log('Registered!')
    // setRegisterState({ ...registerState, name: '', email: '', username: '', password: '' })
    toast.success('Account Created!', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // })
    // .catch(err => console.log(err))
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
          window.location = '/'
          // console.log('it works!')
          // toast('Yes')
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
            
            // value={registerState.name}
            // onChange={registerState.handleInputChange} 
            />
          </p>
         
          <p>
            <Label htmlFor="email">Email</Label>
            <Input type="email"
              name="email"
            // value={registerState.email}
            // onChange={registerState.handleInputChange}
            />
          </p>
          
          <p>
            <Label htmlFor="username">Username</Label>
            <Input type="text"
              name="username"
            // value={registerState.username}
            // onChange={registerState.handleInputChange}
            />
          </p>
         
          <p>
            <Label htmlFor="password">Password</Label>
            <Input type="password"
              name="password"
            // value={registerState.password}
            // onChange={registerState.handleInputChange}
            />
          </p>
          <p>
            <Label for="exampleCustomFileBrowser"> Upload a Profile Picture </Label>  <GrCamera/>
            <Input
              className="fileBrowser"
              type="file"
              name="image"
            // value={registerState.image}
            // onChange={registerState.handleFile}  
            /> 
          </p>
          

              <p className="text-center">
            <Button className="grad"
            // onClick={registerState.handleRegister}
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

      

      {/* <div className="padding">
        <form className='form container-fluid center padding'>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Username</label>
            <input type="username" className="form-control input" placeholder="Enter username" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit</button>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>

      </div> */}

    </>
  )
}

export default Login








// import React, { useState } from 'react'
// import axios from 'axios'
// // import { ToastConatiner, toast, ToastContainer } from 'react-toastify'
// // import 'react-toastify/dist/ReactToastify.css'
// // import API from '../../utils/API'
// import { Toast, ToastBody, ToastHeader, Row, Col, } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Login.css'

// const Login = () => {

//   const [registerState, setRegisterState] = useState({
//     name: '',
//     email: '',
//     username: '',
//     password: '',
//     lPassword: '',
//     lUsername: '',
//     image: ''
//   })

//   registerState.handleFile = event => {
//     console.log(event.target.files[0])
//     setRegisterState({ ...registerState, image: event.target.files[0] })
//   }

//   registerState.handleRegister = event => {
//     event.preventDefault()

//     // const formData = new FormData()
//     // formData.append("img", registerState.image)
    

//     // axios.post('/api/users/register', {
//     //   name: registerState.name,
//     //   email: registerState.email,
//     //   username: registerState.username,
//     //   password: registerState.password,
//     //   image: formData

//     // })
//     // .then(() => {
//     //   // console.log('Registered!')
//       // setRegisterState({ ...registerState, name: '', email: '', username: '', password: '' })
//       toast.success('Account Created!', {
//         position: "bottom-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         });
//     // })
//     // .catch(err => console.log(err))
//   }

//   registerState.handleInputChange = event => {
//     setRegisterState({ ...registerState, [event.target.name]: event.target.value })
//     // console.log(registerState)
//   }

//   registerState.handleLogin = event => {
//     event.preventDefault()
//     // console.log('Logged In!')
//     axios.post('api/users/login', {
//       username: registerState.lUsername,
//       password: registerState.lPassword
//     })
//     .then(({ data: token }) => {
//       if (token) {
//         localStorage.setItem('user', token)
//         window.location = '/'
//         // console.log('it works!')
//         // toast('Yes')
//       } else {
//         toast.error('Incorrect Credentials', {
//           position: "bottom-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           });
//       }
//     })
//   }

//   return (
//     <>

// <iframe name='hidden-frame'></iframe>
// <h1>Sign Up Page</h1>
//       <form target='hidden-frame' action='/api/users/register' method='POST' encType="multipart/form-data"> 
//         <p>
//           <label htmlFor="name">Name</label>
//           <input type="text"
//           name="name" 
//           // value={registerState.name}
//           // onChange={registerState.handleInputChange} 
//           />
//         </p>
//         <p>
//           <label htmlFor="email">Email</label>
//           <input type="email"
//           name="email" 
//           // value={registerState.email}
//           // onChange={registerState.handleInputChange}
//           />
//         </p>
//         <p>
//           <label htmlFor="username">Username</label>
//           <input type="text"
//           name="username" 
//           // value={registerState.username}
//           // onChange={registerState.handleInputChange}
//           />
//         </p>
//         <p>
//           <label htmlFor="password">Password</label>
//           <input type="password"
//           name="password" 
//           // value={registerState.password}
//           // onChange={registerState.handleInputChange}
//           />
//         </p>
//         <p>
//           <label for="exampleCustomFileBrowser">File Browser</label>
//           <input 
//           type="file" 
//           name="image"
//           // value={registerState.image}
//           // onChange={registerState.handleFile}  
//           />
//         </p>
            
//         <p>
//           <button 
//           // onClick={registerState.handleRegister}
//           >Submit</button>
//           <ToastContainer />
//         </p>
//       </form>


//       {/* <form encType="multipart/form-data">
//         <p>
//           <label htmlFor="name">Name</label>
//           <input type="text"
//             name="name"
//           value={registerState.name}
//           onChange={registerState.handleInputChange} 
//           />
//         </p>
//         <p>
//           <label htmlFor="email">Email</label>
//           <input type="email"
//             name="email"
//           value={registerState.email}
//           onChange={registerState.handleInputChange}
//           />
//         </p>
//         <p>
//           <label htmlFor="username">Username</label>
//           <input type="text"
//             name="username"
//           value={registerState.username}
//           onChange={registerState.handleInputChange}
//           />
//         </p>
//         <p>
//           <label htmlFor="password">Password</label>
//           <input type="password"
//             name="password"
//           value={registerState.password}
//           onChange={registerState.handleInputChange}
//           />
//         </p>

//         <p>
//           <label for="exampleCustomFileBrowser">File Browser</label>
//           <input
//             type="file"
//             name="image"
//             // value={registerState.image}
//             onChange={registerState.handleFile}  
//           />
//         </p>
//         <p>
//           <button
//           onClick={registerState.handleRegister}>Submit</button>
//           <ToastContainer />
//         </p>
//       </form> */}
  

















      

      {/* <h1 className='center'>Sign Up Page</h1> */}
      {/* <form className='form container-fluid center'>
        <p>
          <label htmlFor="name">Name</label>
          <input  className= 'input'type="text"
          name="name" 
          value={registerState.name}
          onChange={registerState.handleInputChange} />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input className= 'input' type="email"
          name="email" 
          value={registerState.email}
          onChange={registerState.handleInputChange}/>
        </p>
        <p>
          <label htmlFor="username">Username</label>
          <input className= 'input' type="text"
          name="username" 
          value={registerState.username}
          onChange={registerState.handleInputChange}/>
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input className= 'input' type="password"
          name="password" 
          value={registerState.password}
          onChange={registerState.handleInputChange}/>
        </p>
        <p>
          <button onClick={registerState.handleRegister}>Submit</button>
          {/* <ToastContainer /> 
      * </p>
      </form> 

    


      <h1>Login</h1>

      <form>
        <p>
          <label htmlFor="lUsername">Username</label>
          <input  className= 'input' type="text"
          name="lUsername" 
          value={registerState.lUsername}
          onChange={registerState.handleInputChange} />
        </p>
        <p>
          <label htmlFor="lPassword">Password</label>
          <input  className= 'input' type="password"
          name="lPassword" 
          value={registerState.lPassword}
          onChange={registerState.handleInputChange} />
        </p>
        <p>
          <button onClick={registerState.handleLogin}>Login</button>
        </p>
      </form>  

      <br></br>

 
    <Col className= "col-6 containter-fluid" id="signuparea">
<div className="padding">
      <form className='form container-fluid center padding'>
                <h3>Sign Up</h3>
               

                <div className="form-group">
                    <label>Name</label>
                    <input name="email" 
                    value={registerState.email}
                onChange={registerState.handleInputChange} 
                   type="Name" className="form-control" placeholder="Enter name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input name="email" 
          value={registerState.email}
          onChange={registerState.handleInputChange}
          type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input name="username" 
          value={registerState.username}
          onChange={registerState.handleInputChange}
          className="inputtext" type="username" className="form-control input" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" 
          value={registerState.password}
          onChange={registerState.handleInputChange} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button onClick={registerState.handleRegister} type="submit" className="btn btn-primary btn-block">Submit</button>
                <ToastContainer />
                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
      //       </form>
        
      //       </div>
      //       </Col>

      //       <Col  className= "col-6 container-fluid" id ="loginarea">

      //       <div className="padding">
      // <form className='form container-fluid center padding'>
      //           <h3>Log In</h3>

      //           <div className="form-group">
      //               <label>Username</label>
      //               <input name="lUsername" 
      //     value={registerState.lUsername}
      //     onChange={registerState.handleInputChange}
      //     className="inputtext" type="username" className="form-control input" placeholder="Enter username" />
      //           </div>

      //           <div className="form-group">
      //               <label>Password</label>
      //               <input name="lPassword" 
      //     value={registerState.lPassword}
      //     onChange={registerState.handleInputChange}
      //     type="password" className="form-control" placeholder="Enter password" />
      //           </div>

      //           <div className="form-group">
      //               <div className="custom-control custom-checkbox">
      //                   <input type="checkbox" className="custom-control-input input" id="customCheck1" />
      //                   <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
      //               </div>
      //           </div>

      //           <button type="submit" className="btn btn-primary btn-block">Submit</button>
      //           <p className="forgot-password text-right">
      //               Forgot <a href="#">password?</a>
      //           </p>
      //       </form>
        
      //       </div>
      //       </Col>







         
           
//     </>
//   )
// }

// export default Login