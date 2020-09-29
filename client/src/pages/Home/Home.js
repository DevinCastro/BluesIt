import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Thread from '../Thread'
import Post from '../../components/Post'
import Moment from 'react-moment'
import './Home.css'




const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [modal, setModal] = useState(false);

  const toggle2 = () => setModal(!modal);


  const [postState, setPostState] = useState({
    text: '',
    title: '',
    link: '',
    posts: []
  })

  postState.handleInputChange = event => {
    setPostState({ ...postState, [event.target.name]: event.target.value })
  }

  

  // function to hanlde a user making a post
  postState.handlePost = event => {
    event.preventDefault()
    console.log('hi')
    toggle2()

    axios.post('/api/posts', {
      text: postState.text,
      title: postState.title,
      link: postState.link,
      likes: 0
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
    .then(({data}) => {

      console.log(data)
      setPostState({ ...postState, text: '' })
      window.location = '/'
    
    })
    .catch(err => {
      console.log('toast "you need to log in"')
      window.location = '/login'
    })


  }


  // populate posts on page, useEffect to GET posts
  useEffect(() => {
    axios.get('/api/posts')
      .then(({ data }) => {
        const posts = data.map(post => ({
          ...post,
          liked: false
        }))
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setPostState({ ...postState, posts })
        console.log(data)
      })
  }, [])



 

  postState.handleLike = event => {
    console.log(event.target.id)
    let id = event.target.id
    console.log(event.target.dataset.liked)
    console.log(event.target.dataset.likes)
    let likes = event.target.dataset.liked === "true" ? parseInt(event.target.dataset.likes) - 1 : parseInt(event.target.dataset.likes) + 1

    axios.put(`/api/posts/${event.target.id}`, {
      likes
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
      .then(() => {
        console.log('worked')
        let posts = JSON.parse(JSON.stringify(postState.posts))
        posts.forEach(post => {
          if (post._id === id) {
         
            post.likes = likes
            post.liked = !post.liked
          }
        })

        setPostState({ ...postState, posts})

      })
      .catch(err => {
        console.log(err)
      })
  }


  postState.handleLikeSort = () => {
    const posts = postState.posts.sort((a,b) => b.likes - a.likes)
    
    setPostState({ ...postState, posts})
  }


  postState.handleRecentSort = () => {
    const posts = postState.posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    setPostState({ ...postState, posts})
  }
   
  postState.handleCommentSort = () => {
    const posts = postState.posts.sort((a,b) => b.comments.length - a.comments.length)
    
    setPostState({ ...postState, posts})
  }




  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"></link>
      <h1 id="frontlogo" className='center font'>BLUESIT</h1>
      <hr></hr>
      <div>
        <Row>
        <Col xs="9">

        <Row>
        <Col xs="6 " className= "d-flex justify-content-center"> <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle  caret>
        Sort By
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem><Button onClick={postState.handleLikeSort}>Most Liked</Button></DropdownItem>
        <DropdownItem><Button onClick={postState.handleRecentSort}>Most Recent</Button></DropdownItem>
        <DropdownItem><Button onClick={postState.handleCommentSort}>Most Comments</Button></DropdownItem>
        </DropdownMenu>
    </Dropdown>
  </Col>
        <Col xs="6" > <div>
      <Button color="danger" onClick={toggle2}>Make a Post</Button>
      <Modal isOpen={modal} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Make a post</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
            <Label for="exampleText">Title</Label>
            <Input 
            type="textarea" 
            name="title"
            value={postState.title}
            onChange={postState.handleInputChange}
            />
            <Label for="exampleText">Post</Label>
            <Input 
            type="textarea" 
            name="text"
            value={postState.text}
            onChange={postState.handleInputChange}
            />
            <Label for="exampleText">Link (Optional)</Label>
            <Input 
            type="textarea" 
            name="link"
            value={postState.link}
            onChange={postState.handleInputChange}
            />
             <FormGroup>
        <Label for="exampleCustomFileBrowser">File Browser</Label>
        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
      </FormGroup>
            </FormGroup>
            <Button color="primary" onClick={postState.handlePost}>Post</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
        <Button color="secondary" onClick={toggle2}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div></Col>


  
        </Row>

    <br></br>
        
        <Row>
          <div>

              {
                postState.posts.length > 0 ? (
                  postState.posts.map(post => (
                    <div key={post._id}>
                    {/* <Link to="/thread"> */}
                      <Post 
                      id={post._id}
                      username={post.user.username}
                      title={post.title}
                      likes={post.likes}
                      liked={post.liked}
                      text={post.text}
                      handleLike={postState.handleLike}
                      commentNum={post.comments.length}
                      date={post.createdAt}
                      link={post.link}
                      />
                    {/* </Link> */}
                    </div>
                  ))
                  ) : null
                }
                </div>
        </Row>

        </Col>
        {/* <Col>Tab search Maybe?</Col> */}
        <Col>

        <FormGroup>
        <Label for="search">Search</Label>
        <Input className='search' type="search" id="tabsearch" name="tabsearch" />
      </FormGroup>
      {/* <FormGroup>
        <Label for="exampleCustomFileBrowser">File Browser with Custom Label</Label>
        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Yo, pick a file!" />
      </FormGroup> */}
        
        </Col>

        </Row>
        </div>
    </>
  )
}

export default Home