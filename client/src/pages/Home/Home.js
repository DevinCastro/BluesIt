import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Thread from '../Thread'
import Post from '../../components/Post'

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [modal, setModal] = useState(false);

  const toggle2 = () => setModal(!modal);


  const [postState, setPostState] = useState({
    text: '',
    title: '',
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






  return (
    <>
      <h1>Home page</h1>
      <Container>
        <Row>
        <Col xs="9">

        <Row>
        <Col xs="4"> <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Sort By
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem><Button>Most Liked</Button></DropdownItem>
        <DropdownItem><Button>Most Recent</Button></DropdownItem>
        </DropdownMenu>
    </Dropdown>
  </Col>
        <Col xs="4"> <div>
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
            </FormGroup>
            <Button color="primary" onClick={postState.handlePost}>Post</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
        <Button color="secondary" onClick={toggle2}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div></Col>
        <Col xs="4">Search</Col>
        </Row>
        
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
                      />
                    {/* </Link> */}
                    </div>
                  ))
                  ) : null
                }
                </div>
        </Row>

        </Col>
        <Col>Tab search Maybe?</Col>
        </Row>
        </Container>
    </>
  )
}

export default Home