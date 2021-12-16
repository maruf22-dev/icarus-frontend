import { Router, useRouter } from 'next/router'
import React from 'react'
import { useAppContext } from '../context/AppContext';



const Chatter = () => {
    let Router = useRouter();
    const { appLevelChange, setAppLevelChange, recieverID } = useAppContext();



    return (
        <div>
            <h1 >Chatter</h1>
            <p onClick={() => { Router.push('/dashboard') }}>go to Dashboard</p>
            <p onClick={() => { Router.push('/chat/development') }}>go to chat</p>
        </div>
    )
}

export default Chatter
