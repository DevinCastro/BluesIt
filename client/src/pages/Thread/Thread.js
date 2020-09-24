import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    useParams
} from 'react-router-dom'
import Threadpost from '../../components/Threadpost'

const Thread = props => {

    const [threadState, setThreadState] = useState({
        post: {},
        username: ''
    })

    let { id } = useParams()

    useEffect(() => {
        axios.get(`/api/posts/${id}`)
        .then(({ data }) => {
            //continuously running, fix later
            let username = data.user.username
            console.log(data)
            setThreadState({ ...threadState, post: data, username})
        })
        .catch(err => console.log(err))
    },[])


    return (
        <>
            <Threadpost 
            id={threadState.post._id} 
            username={threadState.username}
            title={threadState.post.title}
            likes={threadState.post.likes}
            text={threadState.post.text}
            />
        </>
    )
} 

export default Thread