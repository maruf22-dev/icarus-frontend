import { useRouter } from 'next/router'
import { React, useEffect } from 'react'

import { AppContext, useAppContext } from '../context/AppContext';


const Dashboard = () => {
    const router = useRouter();
    const { appLevelChange, setAppLevelChange, setLoggedIn, loggedIn } = useAppContext();
    useEffect(() => {
        const verified = localStorage.getItem('loggedIn');
        window.addEventListener('storage', () => {
            if (JSON.parse(verified) === false) router.push("/entrance");
        })
        if (JSON.parse(verified) === false) router.push("/entrance");
    }, [])

    return (
        loggedIn &&
        <div>
            <h1>Dashboard</h1>
            <p onClick={() => { router.push('/chatter') }}>go to chatter</p>
            <p
                onClick={() => {
                    setLoggedIn(false);
                    setAppLevelChange(!appLevelChange);
                    router.push("/entrance");
                }}>log out</p>

        </div>
    )
}

export default Dashboard
