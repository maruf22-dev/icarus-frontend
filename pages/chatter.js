import { Router, useRouter } from 'next/router'
import React from 'react'


const Chatter = () => {
    let Router = useRouter();
    return (
        <div>
            <h1 >Chatter</h1>
            <p  onClick={()=>{Router.push('/dashboard')}}>go to Dashboard</p>
            <p  onClick={()=>{Router.push('/chat/development')}}>go to chat</p>
        </div>
    )
}

export default Chatter
