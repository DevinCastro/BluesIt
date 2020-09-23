import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [modal, setModal] = useState(false);

  const toggle2 = () => setModal(!modal);


  const [postState, setPostState] = useState({
    text: '',
    likes: 0
  })

  postState.handleInputChange = event => {
    setPostState({ ...postState, [event.target.name]: event.target.value })
  }

  postState.handlePost = event => {
    event.preventDefault()
    console.log('hi')

    axios.post('/api/posts', {
      text: postState.text,
      likes: 0
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
    .then(({data}) => {
      console.log(data)
    })
    .catch(err => console.log(err))


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
            <Label for="exampleText">Text Area</Label>
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
        <Col xs="4">.col3</Col>
        </Row>
        
        <Row>
          <h1>Posts</h1>
        </Row>

        </Col>
        <Col>.col</Col>
        </Row>
        </Container>
    </>
  )
}

export default Home