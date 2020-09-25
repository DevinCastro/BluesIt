import React, { useState } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import axios from 'axios'
import { PromiseProvider } from 'mongoose';
import Moment from 'react-moment'

const Comment = props => {


  return (
    <>
      <div>
        <Card className="w-full">
          <CardBody>
            <CardTitle>Comment by: {props.username}</CardTitle>
            <CardText>{props.text}</CardText>
            <CardText><a href={props.link}>{props.link}</a></CardText>
            <CardText>Posted on <Moment format="MM/DD/YY h:mm a">{props.date}</Moment></CardText>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Comment