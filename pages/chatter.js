import { Router, useRouter } from 'next/router'
import React from 'react'


const Chatter = () => {
    let Router = useRouter();
    return (
        <div>
            <h1 style={{color: "snow"}}>Chatter</h1>
            <p style={{color: "snow"}} onClick={()=>{Router.push('/Dashboard')}}>go to Dashboard</p>
            <p style={{color: "snow"}} onClick={()=>{Router.push('/chat/development')}}>go to chat</p>
            <p style={{color: "snow"}} onClick={()=>{Router.push('/Entrance')}}>log out</p>
            
        </div>
    )
}

export default Chatter
