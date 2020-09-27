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
import Moment from 'react-moment';
import './Post.css'


const Post = props => {

  const [idState, setIdState] = useState({
    id: ''
  })


  return (
    <>
      <div className="post-body">
        <Card className="w-full card main-body">
          {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
          <CardBody>
            <CardTitle>Post by: {props.username}</CardTitle>
            <CardSubtitle>👍 {props.likes}</CardSubtitle>
            <CardSubtitle>Title: {props.title}</CardSubtitle>
            <CardText>{props.text}</CardText>
            <CardText><a target='_blank' href={props.link}>{props.link}</a></CardText>
            <CardText>{props.commentNum} comments</CardText>
            <CardText>Posted on: <Moment format="MM/DD/YY h:mm a">{props.date}</Moment> </CardText>

          { localStorage.getItem('user') ?

            
              (props.liked ? <Button id={props.id} data-likes={props.likes} data-liked={props.liked} onClick={props.handleLike}>👎︎</Button> : <Button id={props.id} data-likes={props.likes} data-liked={props.liked} onClick={props.handleLike}>👍</Button>)

            : null 

          }


            <Link to={`/thread/${props.id}`}><Button id={props.id}>View Thread</Button></Link>
          </CardBody>
        </Card>
      </div>

      
    </>
  )}

  export default Post




//   // const [likeState, setLikeState] = useState({ })

//   // likeState.handleLike = event => {
//   //   console.log(event.target.id)

//   //   let likes = parseInt(event.target.dataset.likes) + (props.liked ? -1 : 1) 
   
//   //   axios.put(`/api/posts/${event.target.id}`, {
//   //     likes: parseInt(event.target.dataset.likes) + 1
//   //   }, {
//   //     headers: {
//   //       Authorization: `Bearer ${localStorage.getItem('user')}`
//   //     }
//   //   })
//   //   .then(() => {
//   //     console.log('worked')
//   //     window.location = '/'
//   //   })
//   //   .catch(err => {
//   //     console.log(err)
//   //     alert('You need to Log In')
//   //   })
//   // }

//   // function to hanlde a user making a post
//   // postState.handlePost = event => {
//   //   event.preventDefault()
//   //   console.log('hi')
//   //   toggle2()

//   //   axios.post('/api/posts', {
//   //     text: postState.text,
//   //     title: postState.title,
//   //     likes: 0
//   //   }, {
//   //     headers: {
//   //       Authorization: `Bearer ${localStorage.getItem('user')}`
//   //     }
//   //   })
//   //     .then(({ data }) => {

//   //       console.log(data)
//   //       setPostState({ ...postState, text: '' })
//   //       window.location = '/'

//   //     })
//   //     .catch(err => {
//   //       console.log('toast "you need to log in"')
//   //       window.location = '/login'
//   //     })


//   // }





  
  // const postBox = (props) => {
  //   return(
  //     <div className="post-body">
  //       {props.children}
  //     </div>
  //   )
  // }
  
  // const Image = (props) => {
  //   return(
  //     <img src={props.image} alt="Logo" className="picture">
  //     </img>
  //   )
  // }
  
  // const Handle = (props) => {
  //   return(
  //     <div className="handle">
  //       {props.handle}
  //     </div>
  //   )
  // }
  
  // const Name = (props) => {
  //   return(
  //     <div className="name">
  //       {props.name}
  //     </div>
  //   )
  // }
  
  // const post = (props) => {
  //   return(
  //     <div className="post">
  //       {props.post}
  //     </div>
  //   )
  // }
  
  // const postBody = (props) => {
  //   return(
  //     <postBox>
  //       <div className="inner-body">
  //         <Image image={props.image}/>
  //         <div className="body">
  //           <div className="inner-body">
  //             <Name name={props.name}/>
  //             <Handle handle={props.handle}/>
  //           </div>
  //           <post post={props.post}/>
  //         </div>
  //       </div>
  //     </postBox>
  //   )
  // }
  
  // export default { postBody }


  // import React, { useState } from 'react'
  // import {
  //   Card, CardImg, CardText, CardBody,
  //   CardTitle, CardSubtitle, Button
  // } from 'reactstrap';


//   import { StreamApp, NotificationDropdown, FlatFeed, Activity, LikeButton } from 'react-activity-feed';
// import 'react-activity-feed/dist/index.css';

// class App extends React.Component {
//   render () {
//     return (
//       <StreamApp
//         apiKey="du8he7epvp94"
//         appId="45206"
//         token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYjE5MzNkZmItMzZhZi00OTU5LTk3MGItOGUyMmRiZjkxZWY3In0.TZDMZ8tIp1G89fxcW23-Dbey2dDy1tre83jglZXtUkg"
//         >
//         <NotificationDropdown notify />
//         <FlatFeed
//           notify
//           Activity={(props) =>
//               <Activity {...props}
//                 Footer={() => (
//                   <div style={ {padding: '8px 16px'} }>
//                     <LikeButton {...props} />
//                   </div>
//                 )}
//               />
//             }
//           />
//       </StreamApp>
//     );
//   }
// }

// export default App;