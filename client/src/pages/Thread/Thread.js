import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

const Thread = props => {

    useEffect(() => {
        axios.get('/api/posts/:id')
    })

    return (
        <h1>Hello World!</h1>
    )
} 

export default Thread