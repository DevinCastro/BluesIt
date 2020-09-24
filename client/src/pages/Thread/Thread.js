import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    useParams
} from 'react-router-dom'

const Thread = props => {

    let { id } = useParams()

    useEffect(() => {
        axios.get(`/api/posts/${id}`)
        .then(({ data }) => {
            console.log(data)
        })
        .catch(err => console.log(err))
    })


    return (
        <h1>Hello World!</h1>
    )
} 

export default Thread