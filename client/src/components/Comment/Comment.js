import React, { useState } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import axios from 'axios'
import { PromiseProvider } from 'mongoose';
import Moment from 'react-moment'
import './Comment.css'

const Comment = props => {


  return (
    <>
      <div id="comments">
        <Card className="w-full">
          <CardBody>
           <h2><CardTitle>{props.username} said: </CardTitle></h2> 
            <CardText>{props.text}</CardText>
            <CardText><a target="_blank" href={props.link}>{props.link}</a></CardText>
            <CardText className='small'>Posted on <Moment format="MM/DD/YY h:mm a">{props.date}</Moment></CardText>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Comment