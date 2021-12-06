import { Router, useRouter } from 'next/router'
import React from 'react'


const Dashboard = () => {
    let Router = useRouter();
    return (
        <div>
            <h1 style={{color: "snow"}}>Dashboard</h1>
            <p style={{color: "snow"}} onClick={()=>{Router.push('/Chatter')}}>go to chatter</p>
            <p style={{color: "snow"}} onClick={()=>{Router.push('/chat/development')}}>go to chat</p>
            <p style={{color: "snow"}} onClick={()=>{Router.push('/Entrance')}}>log out</p>
            
        </div>
    )
}

export default Dashboard
