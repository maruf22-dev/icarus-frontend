import { Router, useRouter } from 'next/router'
import React from 'react'
import { useAppContext } from '../context/AppContext';
import styles from '../styles/chatter.module.css'
import { useState, useEffect } from 'react';



const Chatter = () => {

    let Router = useRouter();
    let { setRecieverID, appLevelChange, setAppLevelChange, setThreadName } = useAppContext();
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [messageHistory, setMessageHistory] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {

        //

        setMessageHistory(
            [
                {
                    userID: "1asd",
                    threadName: "Jack Sparrow",
                    threadPictureLink: "",
                    lastMessageTime: "8:12 PM 12/3/21",
                    seen: false,
                },
                {
                    userID: "1asd",
                    threadName: "Jack Sparrow",
                    threadPictureLink: "",
                    lastMessageTime: "8:12 PM 12/3/21",
                    seen: false,
                },
                {
                    userID: "1asd",
                    threadName: "Jack Sparrow",
                    threadPictureLink: "",
                    lastMessageTime: "8:12 PM 12/3/21",
                    seen: true,
                },
            ]
        )
        setAllUsers(
            [
                {
                    userID: "1asd",
                    threadName: "Jack Sparrow",
                    threadPictureLink: "",
                },
                {
                    userID: "1asd",
                    threadName: "Jack Sparrow",
                    threadPictureLink: ""
                },
                {
                    userID: "1asd",
                    threadName: "Jack Sparrow",
                    threadPictureLink: ""
                },
                {
                    userID: "1asd",
                    threadName: "Jack Sparrow",
                    threadPictureLink: ""
                },
                {
                    userID: "1asd",
                    threadName: "Jack Sparrow",
                    threadPictureLink: ""
                },
                {
                    userID: "asd2",
                    threadName: "Roberto Carlos",
                    threadPictureLink: ""

                },
                {
                    userID: "3assda",
                    threadName: "Bennedict",
                    threadPictureLink: ""
                },
                {
                    userID: "4asd",
                    threadName: "Arthur donal coyale",
                    threadPictureLink: ""
                }
            ]
        )
    }, [])
    let handleSearch = (event) => {
        let keyword = event?.target?.value;
        setSearchText(keyword);
        setSearchResult(allUsers);
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
