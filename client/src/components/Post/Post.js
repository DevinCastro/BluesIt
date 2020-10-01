import React, { useState } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
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
import Moment from 'react-moment';
import './Post.css'
import CommIcon from '../CommIcon/CommIcon';


const Post = props => {

  const [idState, setIdState] = useState({
    id: ''
  })

  return (
    <>
      <div className="post-body">
        <Card className="w-full card main-body">
          <CardBody>
            <CardSubtitle ><h1>{props.title}</h1></CardSubtitle>
            <CardText ><a target='_blank' href={props.link}>{props.link}</a></CardText>
            <Row id="small" className="text-center">
              <Col className='left'>
                <CardTitle  >Post by: {props.username}</CardTitle>
              </Col>
              <Col className='left'>
                <CardText><CommIcon />{props.commentNum} comments</CardText>
              </Col>
              <Col className='left'>
                <CardText >Posted on: <Moment format="MM/DD/YY h:mm a">{props.date}</Moment></CardText>
              </Col>
            </Row>

            <div className="text-center">
              {localStorage.getItem('user') ?
                (props.liked ? <Button className="likeMe grad" id={props.id} data-likes={props.likes} data-liked={props.liked} onClick={props.handleLike}>{props.likes} 👎</Button> : <Button className="likeMe grad" id={props.id} data-likes={props.likes} data-liked={props.liked} onClick={props.handleLike}>{props.likes} 👍</Button>)
                : null
              }

              {"            "}
              
              <Link to={`/thread/${props.id}`}><Button className="likeMe grad" id={props.id}>View Thread</Button></Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Post