import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Card } from 'reactstrap';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Song from '../../components/Song'
const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [modal, setModal] = useState(false);
  const toggle2 = () => setModal(!modal);
  const [songState, setSongState] = useState({
    song: '',
    songs: []
  })
  songState.handleInputChange = event => {
    setSongState({ ...songState, [event.target.name]: event.target.value })
  }
  songState.handleSearch = event => {
    event.preventDefault()
    
    axios.get(`https://www.songsterr.com/a/ra/songs.json?pattern=${songState.song}`)
      .then(({ data }) => {
        console.log(data.slice(0, 5))
        setSongState({ ...songState, songs: data.slice(0, 5) })
      })
      .catch(err => console.log(err))
  }
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
      .then(({ data }) => {
        console.log(data)
        setPostState({ ...postState, text: '' })
        window.location = '/'
      })
      .catch(err => {
        console.log('toast "you need to log in"')
        toast.error(' Please log in to make a post!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
        setPostState({ ...postState, posts })
      })
      .catch(err => {
        console.log(err)
      })
  }
  postState.handleLikeSort = () => {
    const posts = postState.posts.sort((a, b) => b.likes - a.likes)
    setPostState({ ...postState, posts })
  }
  postState.handleRecentSort = () => {
    const posts = postState.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    setPostState({ ...postState, posts })
  }
  postState.handleCommentSort = () => {
    const posts = postState.posts.sort((a, b) => b.comments.length - a.comments.length)
    setPostState({ ...postState, posts })
  }
  return (
    <>
      <Container>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"></link>
        <h1 id="frontLogo" className='center font'>BluesIt</h1>
        <hr></hr>
        <div>
          <Row className="nav">
            <Col xs="12">
              <Row className="text-center">
                <Col xs="4"> 
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret className='grad'>
                      Sort By
                    </DropdownToggle >
                    <DropdownMenu className="black solidBorder">
                      <DropdownItem className="black"><Button className="dropDown gradd" onClick={postState.handleLikeSort}>Most Liked</Button></DropdownItem>
                      <DropdownItem className="black"><Button className="dropDown gradd" onClick={postState.handleRecentSort}>Most Recent</Button></DropdownItem>
                      <DropdownItem className="black"><Button className="dropDown gradd" onClick={postState.handleCommentSort}>Most Comments</Button></DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Col>
                <Col xs="4"> 
                  <div>
                    {localStorage.getItem('user') ?
                      <Button color="danger" onClick={toggle2}>Make a Post</Button>
                      : null
                    }
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
                          </FormGroup>
                          <Button className='grad' onClick={postState.handlePost}>Post</Button>
                        </Form>
                      </ModalBody>
                      <ModalFooter>
                        <Button className='grad' onClick={toggle2}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </Col>
                <Col xs="4">
                  {/* <Form>
                    <FormGroup>
                      <Label for="exampleText">Search for Tabs</Label>
                      <Input 
                        id="textBox"
                        type="text"
                        name="song"
                        value={songState.song}
                        onChange={songState.handleInputChange}
                      />
                    </FormGroup>
                    <Button onClick={songState.handleSearch}>Search</Button>
                  </Form> */}
                </Col>
              </Row>
            </Col>
            
          </Row>
          <hr></hr>
          {/* <hr className="white"></hr> */}
          <Row  id="border">
            <Col md="9">
              <div className="please"> 
                {
                  postState.posts.length > 0 ? (
                    postState.posts.map(post => (
                      <div key={post._id}>
                        {/* <Link to="/thread"> */}
                        <Post className="smallPost"
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
            </Col>
            <Col md='3'>
              <Card>
                <Form className="text-center">
                    <FormGroup>
                      <Label for="exampleText">Search for Tabs</Label>
                      <Input 
                        id="textBox"
                        type="text"
                        name="song"
                        value={songState.song}
                        onChange={songState.handleInputChange}
                      />
                    </FormGroup>
                    <Button onClick={songState.handleSearch}>Search</Button>
                </Form>
              </Card>
                {
                  songState.songs.length > 0 ? (
                    songState.songs.map(song => (
                      <div key={song._id}>
                    
                        <Song 
                          name={song.title}
                          artist={song.artist.name}
                          id={song.id}
                        />
      
                      </div>
                    ))
                  ) : null
                }
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}
export default Home