import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Threadpost = props => {


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