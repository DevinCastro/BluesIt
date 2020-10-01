import React, { useState, useEffect } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap'
import axios from 'axios'
import { set } from 'mongoose'
import Comment from '../Comment'
import Moment from 'react-moment';
import {
    useParams,
    Link
} from 'react-router-dom'
import './Threadpost.css'
import CommIcon from '../CommIcon/CommIcon';



const Threadpost = props => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)
    const [modal, setModal] = useState(false)
    const toggle2 = () => setModal(!modal)

    const [commentState, setCommentState] = useState({
        text: '',
        link: '',
        comments: []
    })

    commentState.handleInputChange = event => {
        setCommentState({ ...commentState, [event.target.name]: event.target.value })
    }

    commentState.handleComment = event => {
        event.preventDefault()
        axios.post('/api/comments', {
            text: commentState.text,
            post: event.target.id,
            link: commentState.link
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user')}`
            }
        }
        )
            .then(({ data }) => {
                console.log(data)
                setCommentState({ ...commentState, text: '', link: '' })
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    // useEffect(() => {
    //     axios.get('/api/comments')
    //         .then(({ data }) => {
    //             // const comments = data.filter(comment => comment.post._id === props.id)
    //             console.log(data)
    //         })
    //         .catch(err => console.log(err))
    // },[])

    let { id } = useParams()

    useEffect(() => {
        axios.get(`/api/posts/${id}`)
            .then(({ data }) => {
                
                console.log(data)
                setCommentState({ ...commentState, comments: data.comments})
                
            })
            .catch(err => console.log(err))
    }, [])





    return (
        <>
            <div id="threadPost">
                <Card className="w-full">
                    {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                    <CardBody>
            <CardSubtitle><h1>{props.title}</h1></CardSubtitle>
            <CardText>{props.text}</CardText>
            <CardSubtitle>👍 {props.likes}</CardSubtitle>

            <CardText><a target='_blank' href={props.link}>{props.link}</a></CardText>
            <Row id="small" className="text-center">
              <Col>
                <CardTitle>Post by: {props.username}</CardTitle>
              </Col>
              <Col>
                <CardText><CommIcon/>  {props.commentNum} comments</CardText>
              </Col>
              <Col>
                <CardText>Posted on: <Moment format="MM/DD/YY h:mm a">{props.date}</Moment></CardText>
              </Col>
            
            </Row>
          </CardBody>
                    
                    
                    {/* <CardBody>
                        <CardTitle>Post by: {props.username}</CardTitle>
                        <CardSubtitle>👍 {props.likes}</CardSubtitle>
                        <CardSubtitle>Title: {props.title}</CardSubtitle>
                        <CardText>{props.text}</CardText>
                        <CardText><a target="_blank" href={props.postLink}>{props.postLink}</a></CardText>
                        <CardText>{props.commentNum} Comments</CardText>
                    </CardBody> */}

                </Card>
                <br />
                {localStorage.getItem('user')  ? 
                <Button color="danger" onClick={toggle2}>Add Comment</Button>
                : null
}
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
                                <Label for="exampleText">Link (Optional)</Label>
                                <Input
                                    type="textarea"
                                    name="link"
                                    value={commentState.link}
                                    onChange={commentState.handleInputChange}
                                />
                            </FormGroup>
                            <Button className='grad' id={props.id} onClick={commentState.handleComment}>Add Comment</Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='grad' onClick={toggle2}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>
            <br />


            <div>

                {
                    commentState.comments.length > 0 ? (
                        commentState.comments.map(comment => (
                            <div key={comment._id}>
                                {/* <Link to="/thread"> */}
                                <Comment
                                    id={comment._id}
                                    username={comment.user.username}           
                                    text={comment.text}
                                    date={comment.createdAt}
                                    link={comment.link}
                                />
                                {/* </Link> */}
                            </div>
                        ))
                    ) : null
                }

            </div>

        

        </>
    )
}

export default Threadpost