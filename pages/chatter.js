import axios from 'axios';
import { Router, useRouter } from 'next/router'
import React from 'react'
import { useAppContext } from '../context/AppContext';
import styles from '../styles/chatter.module.css'
import { useState, useEffect } from 'react';

const BACKEND_URL = 'http://localhost:3001';
// BACKEND_URL = 'https://icarus-backend.herokuapp.com' 
const SQL_DB_INFO = 'LOCAL';
// SQL_DB_INFO = 'WEB';



const Chatter = () => {

    let getFormattedDateFromMillis = (millis) => {
        let date = new Date(millis);
        return date.toLocaleString();
    }

    let Router = useRouter();
    let { setRecieverID, appLevelChange, setAppLevelChange, setThreadName, profileID } = useAppContext();
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [messageHistory, setMessageHistory] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    function getThreadName(id,users){
        let user =users.data.data.data;
        console.log(id);
        for(let i=0; i<user.length; i++){
            // console.log(user[i].userID);
            if(user[i].userID===id){
                return user[i].name;
            }
        }
    }

    useEffect(async () => {

        //
        let URL = `${BACKEND_URL}/api/v1/database/gethistory?HOST=${SQL_DB_INFO}`;
        let result = await axios.post(
            URL,
            {
                id: profileID,
            }
        );
        let tempHistory=[];
        let users = await axios.post(
            `${BACKEND_URL}/api/v1/database/getuser?HOST=${SQL_DB_INFO}`,{}
        );

        let all=[];
        let user =users.data.data.data;
        for(let i=0; i<user.length; i++){
            if(user[i].userID===profileID){
                continue;
            }
            let x = {
                userID:user[i].userID,
                threadName:user[i].name,
                threadPictureLink:'',
            }
            all=[...all,x];
        }
        
        let newHistory = [];
        
        for(let i=0;i<result.data.length; i++){
            
                // userID:profileID, threadName:
                let values = result.data[i].id.split('_');
                let thread = '';
                let recepentID = '';
                if(values[0]===values[1]){
                    continue;
                }
                if(values[0]===profileID){
                    recepentID=values[1];
                    thread = getThreadName(values[1],users);
                }
                else{
                    recepentID=values[0];
                    thread = getThreadName(values[0],users);
                }
                
                let history=
                {
                    userID: recepentID,
                    threadName: thread,
                    threadPictureLink: '',
                    lastMessageTime: getFormattedDateFromMillis(parseInt(result.data[i].time)),
                    seen: false,
                }
                
            newHistory=[...newHistory, history];
        }
        setMessageHistory(
            newHistory
        )
        setAllUsers(all);
    }, [profileID])
    let handleSearch = (event) => {
        let keyword = event?.target?.value;
        setSearchText(keyword);
        let result=[];
        for(let i = 0; i<allUsers.length; i++){
            if(allUsers[i].threadName.includes(keyword))
                result=[...result,allUsers[i]];
        }
        setSearchResult(result);
    }
    return (
        // <div>
        //     <h1 >Chatter</h1>
        //     <p onClick={() => { Router.push('/dashboard') }}>go to Dashboard</p>
        //     <p onClick={() => { Router.push('/chat/development') }}>go to chat</p>
        // </div>
        <div className={styles.page}>
            <div className={styles.page_top_container}>
                <div className={styles.home_button_container}>
                    <img onClick={() => {
                        Router.push("/dashboard");
                    }} alt="" src={"../home_icon.png"} />
                </div>
                <div className={styles.title_container}>
                    {(searchText === "") ?
                        <p>
                            Chat History
                        </p> :
                        <p>
                            Search Results
                        </p>
                    }
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.search_bar_container}>
                    <input
                        type="text"
                        placeholder="Search"
                        spellCheck="false"
                        className={styles.search_bar}
                        onChange={(e) => { handleSearch(e) }} />
                </div>
                {
                    (searchText === "") ?
                        <div className={styles.history_container}>
                            {
                                messageHistory.map((current, index) =>
                                    <div key={index} className={styles.history}
                                        onClick={(event) => {
                                            console.log(current.userID);
                                            console.log(profileID);
                                            localStorage.setItem("recieverID", JSON.stringify(current.userID));
                                            localStorage.setItem("threadName", JSON.stringify(current.threadName));
                                            Router.push(`/chat/${current.userID}`);
                                            setRecieverID(current.userID);
                                            setThreadName(current.threadName);
                                            setAppLevelChange(!appLevelChange);
                                        }}
                                    >
                                        <div className={styles.profile_pic}>
                                            <img alt="" src={"../default_profile_pic.png"} />
                                        </div>
                                        <div className={styles.threadname_container}>
                                            <p>   {current.threadName} </p>
                                        </div>
                                        <div className={styles.time_container}>
                                            {current.seen ? <img alt="" src={"../unseen_icon.png"} /> : <></>}
                                            <p>
                                                {current.lastMessageTime}
                                            </p>
                                        </div>
                                    </div>)
                            }


                        </div>
                        :
                        <div className={styles.search_result_container}>
                            {
                                searchResult.map((current, index) =>
                                    <div className={styles.search_result}
                                        key={index}
                                        onClick={(event) => {
                                            console.log(current.userID);
                                            console.log(profileID);
                                            localStorage.setItem("recieverID", JSON.stringify(current.userID));
                                            localStorage.setItem("threadName", JSON.stringify(current.threadName));
                                            Router.push(`/chat/${current.userID}`);
                                            setRecieverID(current.userID);
                                            setThreadName(current.threadName);
                                            setAppLevelChange(!appLevelChange);
                                        }}>
                                        <div className={styles.profile_pic}>
                                            <img alt="" src={"../default_profile_pic.png"} />
                                        </div>
                                        <div className={styles.threadname_container}>
                                            <p>   {current.threadName} </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }


            </div>
        </div>
    )
}

export default Chatter
