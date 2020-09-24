import React, { useState } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import axios from 'axios'


const Post = props => {

  // const [likeState, setLikeState] = useState({ })

  // likeState.handleLike = event => {
  //   console.log(event.target.id)

  //   let likes = parseInt(event.target.dataset.likes) + (props.liked ? -1 : 1) 
   
  //   axios.put(`/api/posts/${event.target.id}`, {
  //     likes: parseInt(event.target.dataset.likes) + 1
  //   }, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('user')}`
  //     }
  //   })
  //   .then(() => {
  //     console.log('worked')
  //     window.location = '/'
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     alert('You need to Log In')
  //   })
  // }

  // function to hanlde a user making a post
  // postState.handlePost = event => {
  //   event.preventDefault()
  //   console.log('hi')
  //   toggle2()

  //   axios.post('/api/posts', {
  //     text: postState.text,
  //     title: postState.title,
  //     likes: 0
  //   }, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('user')}`
  //     }
  //   })
  //     .then(({ data }) => {

  //       console.log(data)
  //       setPostState({ ...postState, text: '' })
  //       window.location = '/'

  //     })
  //     .catch(err => {
  //       console.log('toast "you need to log in"')
  //       window.location = '/login'
  //     })


  // }





  return (
    <>
      <div>
        <Card className="w-full card">
          {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
          <CardBody className='cardposts'>
            <CardTitle>Post by: {props.username}</CardTitle>
            <CardSubtitle>Likes: {props.likes}</CardSubtitle>
            <CardSubtitle>Title: {props.title}</CardSubtitle>
            <CardText>{props.text}</CardText>
            {props.liked ? <Button id={props.id} data-likes={props.likes} data-liked={props.liked} onClick={props.handleLike}>Unlike</Button> : <Button id={props.id} data-likes={props.likes} data-liked={props.liked} onClick={props.handleLike}>Like</Button>}
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Post