import styles from '../../styles/chat.module.css'
const io = require("socket.io-client");
import InputEmoji from 'react-input-emoji';
import { useState, useEffect, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { AppContext, useAppContext } from '../../context/AppContext';
import { useContext } from 'react';
import router, { useRouter } from 'next/router'
import Image from 'next/image'


const SOCKET_LINK = "https://icarus-backend.herokuapp.com";
const socket = io.connect(SOCKET_LINK);

export default function Chat(props) {
    const Router = useRouter();
    let { profileName, profileID, allThreadContext, setAllThreadContext, updateThreadContextFromBackend } = useAppContext();
    let { senderID, receiverID, groupID, threadName } = props;
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [optionPressed, setOptionPressed] = useState(false);
    const [settingSelected, setSettingsSelected] = useState(false);
    const [searchKeyword, selectSearchKeyword] = useState("");
    const [searchContext, setSearchContext] = useState("all");
    const [contextMessages, setContextMessages] = useState([]);
    let scrollTextRef = useRef();
    let inputBarRef = useRef();
    threadName = "{ thread name }"
    senderID = profileID;


    let getFormattedDateFromMillis = (millis) => {
        let date = new Date(millis);
        return date.toLocaleString();
    }

    let getThreadId = (senderID, recieverID, groupID) => {
        let computed = "thread_";
        if (groupID) computed = groupID;
        else if (senderID < recieverID) computed = senderID + "_" + recieverID;
        else computed = recieverID + "_" + senderID;
        return computed;
    }


    let threadID = getThreadId(senderID, receiverID, groupID);

    let sendMessage = async (event) => {
        if (text == "") return;
        socket.emit("send_to_thread", {
            messageID: "message_" + uuid(),
            senderID: senderID,
            senderName: profileName,
            threadID: threadID,
            profileImageLink: null,
            messageText: text,
            timestamp: Date.now(),
        });
        setText('');
    }

    let handleMessageBarChange = (event) => {
        setText(event);
        inputBarRef.current.focus();
    }
    let filterMessageContextByKeyword = (allContext, keyword, searchContext) => {
        let filtered = [];
        for (let context in allContext) {
            let words = allContext[context]?.threadName.toLowerCase().split(' ');
            let shouldAdd = false;
            for (let word in words)
                shouldAdd = shouldAdd || (words[word].indexOf(keyword) == 0);

            shouldAdd = shouldAdd || (allContext[context].threadName.toLowerCase().indexOf(keyword) != -1 && keyword.length > 1);

            if (!shouldAdd) continue;

            let isAProfile = Object.entries(allContext[context])[0][1] != null;
            let isAGroup = Object.entries(allContext[context])[1][1] != null;
            if (isAProfile && (searchContext === "people" || searchContext === "all")) {
                filtered = [...filtered, allContext[context]];
            }
            if (isAGroup && (searchContext === "group" || searchContext === "all")) {
                filtered = [...filtered, allContext[context]];
            }

        }
        return filtered;
    }
    let handleSearch = (event) => {
        let keyword = event?.target?.value;
        selectSearchKeyword(keyword);
        if (!keyword.trim()) {
            setContextMessages([]);
            return;
        }
        let filteredUsers = filterMessageContextByKeyword(allThreadContext, keyword.toLowerCase(), searchContext);
        setContextMessages(filteredUsers);
    }

    useEffect(() => {
        console.log("Socket Changed");

        socket.on('connect', () => {
            console.log(`(Re/)connected with socket id ${socket.id} \n in thread ${threadID}`);
            socket.emit('join_thread', threadID);
        });

        socket.on("recieve_message", (recievedMessage) => {
            console.log("Message from socket! \n");
            setMessages((messages) => [...messages, recievedMessage]);
        });
    }, [socket]);

    useEffect(async () => {
        inputBarRef.current.focus();
        await updateThreadContextFromBackend();
    }, []);

    useEffect(() => {
        scrollTextRef?.current?.scrollIntoView({ behavior: 'smooth' });;
    }, [messages])

    useEffect(() => {
        if (!searchKeyword.trim()) {
            setContextMessages([]);
            return;
        }
        let filteredUsers = filterMessageContextByKeyword(allThreadContext, searchKeyword.toLowerCase(), searchContext);
        setContextMessages(filteredUsers);
    }, [searchContext])


    return (
        <>
            <div className={`${styles.chat_options_backdrop} ${optionPressed ? styles.show_backdrop : styles.no_style}`}>
                <div className={styles.backdrop_top_bar}>
                    <div className={styles.backdrop_page_title_holder}>
                        <p className={styles.backrop_page_title}>{threadName}</p>
                    </div>
                    <div className={styles.option_close_button_holder}>
                        <button className={styles.option_close_button}>
                            <img onClick={() => setOptionPressed(!optionPressed)} alt="" src={"../cross_icon.png"} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.chat_page}>
                <div className={styles.chat_top_bar}>
                    <div className={styles.top_bar_left}>
                        <div className={styles.home_button_holder}>
                            <button className={`${styles.home_button} ${styles.pc}`}>
                                <img onClick={() => {
                                    Router.push("/Dashboard");
                                }} alt="" src={"../home_icon.png"} />
                            </button>
                            <button className={`${styles.home_button} ${styles.mobile}`}>
                                <img onClick={() => {
                                    Router.push("/Chatter");
                                }} alt="" src={"../chatter_icon.png"} />
                            </button>
                        </div>
                        <div className={styles.page_title_holder}>
                            <p className={styles.page_title}>{"Chat"}</p>
                        </div>
                        <div className={styles.option_button_holder}>
                            <button className={`${styles.option_button} ${styles.pc}`}  onClick={() => {
                                    Router.push("/Chatter");
                                }} >
                                <img  alt="" src={"../chatter_icon.png"} />
                            </button>
                            <button className={`${styles.option_button} ${styles.mobile}`}>
                                <img onClick={() => setOptionPressed(!optionPressed)} alt="" src={"../chat_option_icon.png"} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.top_bar_right}>
                        <p className={styles.thread_title}>{threadName}</p>
                    </div>
                </div>
                <div className={styles.chat_main}>
                    <div className={styles.chat_options}>
                        <div className={styles.option_container}>
                            <div className={styles.chat_option_container}>
                                <div onClick={() => setSettingsSelected(false)} className={`${styles.search_option} ${!settingSelected ? styles.selected_option : styles.no_style}`}>
                                    <img alt="" src={"../cross_icon.png"} />
                                </div>
                                <div onClick={() => setSettingsSelected(true)} className={`${styles.settings_option} ${!settingSelected ? styles.no_style : styles.selected_option}`}>
                                    <img alt="" src={"../chat_option_icon.png"} />
                                </div>
                            </div>
                        </div>
                        {
                            settingSelected &&
                            <>
                            </>
                        }
                        {
                            !settingSelected &&
                            <>
                                <div className={styles.searchbar_container}>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className={styles.searchbar}
                                        onChange={(e) => { handleSearch(e) }} />
                                </div>

                                <div className={styles.search_context_holder}>
                                    <div onClick={() => setSearchContext("all")}
                                        className={`${styles.search_context}
                                    ${searchContext === "all" ? styles.selected_context : styles.no_style}`}>
                                        <p className={`${styles.context_paragraph}`}>All</p>
                                    </div>
                                    <div onClick={() => setSearchContext("people")}
                                        className={`${styles.search_context}
                                    ${searchContext === "people" ? styles.selected_context : styles.no_style}`}>
                                        <p className={`${styles.context_paragraph}`} >People</p>
                                    </div>
                                    <div onClick={() => setSearchContext("group")}
                                        className={`${styles.search_context}
                                    ${searchContext === "group" ? styles.selected_context : styles.no_style}`}>
                                        <p className={`${styles.context_paragraph}`}>Group</p>
                                    </div>
                                </div>

                                <div className={styles.search_result_container}>
                                    {
                                        contextMessages.map((context, index) => {
                                            return (

                                                <div className={styles.search_result} key={index || context.userID || context.groupID}>
                                                    <div className={styles.context_profile_picture_container}>
                                                        <img alt="" src={"../default_profile_pic.jpg"} />
                                                    </div>
                                                    <div className={styles.context_threadname_container}>
                                                        <p>   {context?.threadName} </p>
                                                    </div>
                                                    <div className={styles.goto_button_container}>
                                                        <img alt="" src={"../chat_option_icon.png"} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </>
                        }
                    </div>
                    <div className={styles.chat_feed}>
                        <div className={`${styles.chat_list}   ${optionPressed ? styles.invinsible : styles.no_style}`}>
                            {
                                messages.map((currentMessage) => {
                                    return (
                                        <div
                                            key={currentMessage?.messageID}
                                            className={` ${styles.message_container} ${currentMessage?.senderID === senderID ? styles.self : ''}`}>
                                            <div className={styles.message_main}>
                                                <div className={styles.message_header_container}>
                                                    <div className={styles.profile_image_holder}>
                                                        <img className={styles.profile_image} alt="" src={currentMessage?.profileImageLink || "../default_profile_pic.jpg"} />
                                                    </div>
                                                    <div className={styles.message_metadata_holder}>
                                                        <p className={styles.profile_name}>{currentMessage?.senderName}</p>
                                                        <p className={styles.message_timestamp}>{`${currentMessage?.senderID === senderID ? 'sent at' : 'recieved at'} ${getFormattedDateFromMillis(currentMessage?.timestamp)}`}</p>
                                                    </div>
                                                </div>
                                                <div className={`${styles.message}`}>
                                                    {currentMessage?.messageText}
                                                </div>
                                            </div>
                                            <div className={styles.message_space}>
                                            </div>

                                        </div>


                                    )
                                })
                            }
                            <div ref={scrollTextRef}></div>
                        </div>
                        <div spellCheck="false" className={styles.chat_control_bar}>
                            <div className={styles.message_bar_holder}>
                                <InputEmoji className={styles.message_bar}
                                    ref={inputBarRef}
                                    borderColor={"#000000"}
                                    height={60}
                                    placeholder="Type a message"
                                    spellcheck="false"
                                    fontSize={17}
                                    value={text}
                                    onChange={handleMessageBarChange}
                                    onEnter={sendMessage}
                                />
                            </div>
                            <div className={styles.control_button_holder}>
                                <button className={styles.message_submit_button} onClick={sendMessage}>💬</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
