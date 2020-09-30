import React, { useState } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';


const Song = props => {


  return (
    <>
      <div>
        <Card className="w-full">
          <CardBody>
            <CardTitle>{props.name}</CardTitle>
            <CardText>Artist: {props.artist}</CardText>
            <CardText><a target="_blank" href={`https://www.songsterr.com/a/wa/song?id=${props.id}`}>Link</a></CardText>
            <Button>Copy</Button>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Song