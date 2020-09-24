import React, { useState } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Thread from '../../pages/Thread'
import axios from 'axios'
import { PromiseProvider } from 'mongoose';


const Post = props => {

  const [idState, setIdState] = useState({
    id: ''
  })

  idState.handleId = event => {
    event.preventDefault()
    console.log(event.target.id)
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
            {props.liked ? <Button id={props.id} data-likes={props.likes} data-liked={props.liked} onClick={props.handleLike}>Unlike</Button> : <Button id={props.id} data-likes={props.likes} data-liked={props.liked} onClick={props.handleLike}>Like</Button>}
            <Button id={props.id} onClick={idState.handleId}>View Thread</Button>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Post