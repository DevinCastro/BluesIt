import Axios from 'axios'
import React, { useState } from 'react'
import { 
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import axios from 'axios'
import { set } from 'mongoose'


const Threadpost = props => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)
    const [modal, setModal] = useState(false)
    const toggle2 = () => setModal(!modal)

const [commentState, setCommentState] = useState({
text: '',
comments: []
})

commentState.handleInputChange = event => {
    setCommentState({...commentState, [event.target.name]: event.target.value})
}

commentState.handleComment = event => {
    event.preventDefault()
    axios.post('/api/comments', {
        text: commentState.text,
        post: event.target.id
    }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }
  )
    .then(({data})=>{
        console.log(data)
        setCommentState({...commentState, text: ''})
        window.location.reload()
    })
    .catch(err => console.log(err))  
}

    return (
        <>
            <div>
                <Card className="w-full">
                    {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                    <CardBody>
                        <CardTitle>Post by: {props.username}</CardTitle>
                        <CardSubtitle>Likes: {props.likes}</CardSubtitle>
                        <CardSubtitle>Title: {props.title}</CardSubtitle>
                        <CardText>{props.text}</CardText>
                    </CardBody>

                </Card>
                <Button color="danger" onClick={toggle2}>Add Comment</Button>
      <Modal isOpen={modal} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Write a Comment</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
            <Label for="exampleText">Comment</Label>
            <Input 
            type="textarea" 
            name="text"
            value={commentState.text}
            onChange={commentState.handleInputChange}
            />
            </FormGroup>
            <Button id={props.id} color="primary" onClick={commentState.handleComment}>Add Comment</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
        <Button color="secondary" onClick={toggle2}>Cancel</Button>
        </ModalFooter>
</Modal>
                {/* <ListGroup>
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Morbi leo risus</ListGroupItem>
                    <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup> */}
            </div>
        </>
    )
}

export default Threadpost