import React, { useState } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import axios from 'axios'
import { PromiseProvider } from 'mongoose';


const Comment = props => {


  return (
    <>
      <div>
        <Card className="w-full">
          <CardBody>
            <CardTitle>Comment by: {props.username}</CardTitle>
            <CardText>{props.text}</CardText>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Comment