import styles from '../../styles/chat.module.css'
import axios from 'axios';
const io = require("socket.io-client");
import InputEmoji from 'react-input-emoji';
import { useState, useEffect, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { AppContext, useAppContext } from '../../context/AppContext';
import { useContext } from 'react';
import router, { useRouter } from 'next/router'
import Image from 'next/image'


const BACKEND_URL = 'http://localhost:3001';
// BACKEND_URL = 'https://icarus-backend.herokuapp.com' 
const SQL_DB_INFO = 'LOCAL';
// SQL_DB_INFO = 'WEB';

// const SOCKET_LINK = "https://icarus-backend.herokuapp.com";
const SOCKET_LINK = "http://localhost:3001";
const socket = io.connect(SOCKET_LINK);


export default function Chat() {
    // used to change route
    // some necessary states from the app Context Provider to use the context of the chat
    let {
        profileName,
        profileID,
        allThreadContext,
        setAllThreadContext,
        loggedIn,
        setLoggedIn,
        updateThreadContextFromBackend,
        recieverID,
        appLevelChange,
        threadName
    } = useAppContext();

    // text state for the message from input field
    const [text, setText] = useState("");
    const [report, setReport] = useState(false);
    const [showChat, setShowChat] = useState(true);

    // state for current messages (unpaginated) state | (including previous messages from database)
    const [messages, setMessages] = useState([]);
    const [optionPressed, setOptionPressed] = useState(false);
    const [settingSelected, setSettingsSelected] = useState(false);
    const [searchKeyword, selectSearchKeyword] = useState("");
    const [searchContext, setSearchContext] = useState("all");

    // subset of messages (as per the search keyword)
    const [contextMessages, setContextMessages] = useState([]);

    let scrollTextRef = useRef();
    let inputBarRef = useRef();
    let senderID = profileID;

    // takes millis from 1970 to current time : creates a string represebtation
    let getFormattedDateFromMillis = (millis) => {
        let date = new Date(millis);
        return date.toLocaleString();
    }

    // takes sender and receiver id : creates a unique threadID
    let getThreadId = (senderID, recieverID) => {
        let computed = "thread_";
        if (senderID < recieverID) computed = senderID + "_" + recieverID;
        else computed = recieverID + "_" + senderID;
        return computed;
    }


    // sends message to the socket
    let sendMessage = async (event) => {
        if (!text.trim()) return;

        socket.emit("send_to_thread", {
            messageID: "message_" + uuid(),
            senderID: senderID,
            senderName: profileName,
            recieverID: recieverID,
            senderProfileImageLink: null,
            messageText: text,
            timestamp: Date.now(),
        });
        setText('');
        // let texts = await axios.post(
        //     `${BACKEND_URL}/api/v1/database/getmessages?HOST=${SQL_DB_INFO}`, {}
        // );
        // console.log(texts);
        // let newMessages=[];
        // let messages = texts.data.data.data;
        // for (let i = 0; i < messages.length; i++) {
        //     let message = {
        //         messageID: messages[i].msgID,
        //         senderID: messages[i].senderID,
        //         senderName: messages[i].profileName,
        //         recieverID: messages[i].recieverID,
        //         senderProfileImageLink: null,
        //         messageText: messages[i].text,
        //         timestamp: messages[i].timeSent,
        //     }
        //     newMessages=[...newMessages,message];
        // }
        // setMessages(newMessages);
    }

    // changes text state based on input bar change
    let handleMessageBarChange = (event) => {
        setText(event);
        inputBarRef.current?.focus();
    }


    // changes state based on search input bar change
    let handleSearch = (event) => {
        let keyword = event?.target?.value;
        selectSearchKeyword(keyword);
        if (!keyword.trim()) {
            setContextMessages([]);
            return;
        }
        let result = [];
        for (let i = 0; i < allThreadContext.length; i++) {
            if (profileID === allThreadContext[i].userID)
                continue;
            if (allThreadContext[i].threadName.includes(keyword))
                result = [...result, allThreadContext[i]];
        }
        // let filteredUsers = filterMessageContextByKeyword(allThreadContext, keyword.toLowerCase(), searchContext);
        setContextMessages(result);
    }

    //
    useEffect(() => {
        if (recieverID) {
            setShowChat(false);
            router.reload(window.location.pathname);
        }
    }, [appLevelChange])

    // initial socket connection
    // recieving current connection -> messages from backend
    useEffect(() => {
        if (profileID === "") return;
        socket.on('connect', () => {
            console.log(`(Re/)connected with socket id ${socket.id} \n in thread ${getThreadId(profileID, recieverID)}`);
            socket.emit('join_thread', getThreadId(profileID, recieverID));
        });

        socket.on("recieve_message", (recievedMessage) => {
            if ((recievedMessage.senderID === profileID) && (recievedMessage.recieverID === recieverID)) {
                setMessages((messages) => [...messages, recievedMessage]);
            }
        });
    }, [socket, profileID, recieverID]);



    // updation of thread context in the APP_CONTEXT
    useEffect(async () => {
        await updateThreadContextFromBackend();
        let texts = await axios.post(
            `${BACKEND_URL}/api/v1/database/getmessages?HOST=${SQL_DB_INFO}`, {}
        );
        let newMessages=[];
        let messages = texts.data.data.data;
        console.log(getThreadId(senderID, recieverID));
        for (let i = 0; i < messages.length; i++) {
            if(messages[i].threadID!==getThreadId(senderID, recieverID))
                continue;
            let message = {
                messageID: messages[i].msgID,
                senderID: messages[i].senderID,
                senderName: messages[i].senderName,
                recieverID: messages[i].recieverID,
                senderProfileImageLink: null,
                messageText: messages[i].text,
                timestamp: messages[i].timeSent,
            }
            newMessages=[...newMessages,message];
        }
        setMessages(newMessages);
        inputBarRef.current?.focus();
    }, [senderID]);

    // scroll to current text if text recieved
    useEffect(() => {
        scrollTextRef?.current?.scrollIntoView({ behavior: 'smooth' });;
    }, [messages])

    // search logic and contextMessages updation
    useEffect(() => {

        if (!searchKeyword.trim()) {
            setContextMessages([]);
            return;
        }
        let filteredUsers = filterMessageContextByKeyword(allThreadContext, searchKeyword.toLowerCase(), searchContext);
        setContextMessages(filteredUsers);

    }, [searchContext])

    return (
        // loggedIn && showChat &&
        <>
            <Backdrop
                optionPressed={optionPressed} setOptionPressed={setOptionPressed} threadName={threadName}
                report={report} setReport={setReport} recieverID={recieverID}
            >
            </Backdrop>
            <ChatPage
                threadName={threadName} setOptionPressed={setOptionPressed} optionPressed={optionPressed}
                settingSelected={settingSelected} contextMessages={contextMessages}
                setSettingsSelected={setSettingsSelected} handleSearch={handleSearch}
                messages={messages}
                scrollTextRef={scrollTextRef} senderID={senderID} recieverID={recieverID}
                text={text} inputBarRef={inputBarRef}
                report={report} setReport={setReport}
                handleMessageBarChange={handleMessageBarChange} sendMessage={sendMessage}>
                {recieverID}
            </ChatPage>
            <ReportModule
                report={report}
                setReport={setReport}
                threadName={threadName}
            >
            </ReportModule>
        </>
    );
}
function ReportModule({
    report,
    setReport,
    threadName
}) {
    return (
        <div className={`${styles.report_module} 
        ${report ? styles.show_report : styles.no_style}`}>
            <div className={styles.report_warning}>
                <p>
                    Do you really want to report {threadName} ?
                </p>
            </div>
            <div className={styles.report_option_container}>
                <div className={styles.report_option}>
                    Yes
                </div>
                <div className={styles.report_option}
                    onClick={() => setReport(false)}>
                    No
                </div>
            </div>
        </div>
    )
}
function Backdrop({ optionPressed, setOptionPressed, threadName, report, setReport, recieverID }) {
    let Router = useRouter();
    return (
        <div className={`${styles.chat_options_backdrop} 
            ${optionPressed ? styles.show_backdrop : styles.no_style}`}>

            <div className={styles.backdrop_top_bar}>
                <div className={styles.backdrop_page_title_holder}>
                    <p className={styles.backrop_page_title}>
                        {threadName}
                    </p>
                </div>
                <div className={styles.option_close_button_holder}>
                    <div className={styles.option_close_button}>
                        <img onClick={() => {
                            setOptionPressed(!optionPressed);
                            setReport(false)
                        }} alt=""
                            src={"../back_button.png"} />
                    </div>
                </div>
            </div>
            <div className={styles.mobile_chat_setting_image}>
                <img alt="" src={"../default_profile_pic.png"} />
            </div>
            <div className={styles.mobile_chat_setting_container}>

                <div className={styles.mobile_chat_setting} onClick={(event) => { }}>

                    <div className={styles.context_profile_picture_container}>
                        <img alt="" src={"../profile.png"} />
                    </div>
                    <div className={styles.context_threadname_container} onClick={() => {
                        Router.push(`/visit/${recieverID}`);
                    }}>
                        <p>View Profile</p>
                    </div>
                </div>
                <div className={styles.mobile_chat_setting} onClick={(event) => { }}>
                    <div className={styles.context_profile_picture_container}>
                        <img alt="" src={"../block.png"} />
                    </div>
                    <div className={styles.context_threadname_container}>
                        <p>Block User</p>
                    </div>
                </div>
                <div className={styles.mobile_chat_setting} onClick={(event) => { setReport(true) }}>
                    <div className={styles.context_profile_picture_container}>
                        <img alt="" src={"../report.png"} />
                    </div>
                    <div className={styles.context_threadname_container}>
                        <p>Report User</p>
                    </div>
                </div>
            </div>

        </div>
    );
}


function ChatPage({
    threadName, optionPressed, setOptionPressed,
    settingSelected, setSettingsSelected, contextMessages,
    handleSearch, messages, scrollTextRef,
    senderID, text, inputBarRef,
    handleMessageBarChange, sendMessage,
    report, recieverID,
    setReport
}) {
    return (
        <div className={styles.chat_page}>
            <TopBar
                threadName={threadName} setOptionPressed={setOptionPressed} optionPressed={optionPressed}>
            </TopBar>
            <div className={styles.chat_main}>
                <OptionBar
                    settingSelected={settingSelected} contextMessages={contextMessages}
                    setSettingsSelected={setSettingsSelected} handleSearch={handleSearch}
                    report={report} setReport={setReport}
                    recieverID={recieverID}
                >
                </OptionBar>
                <div className={styles.chat_feed}>
                    <ChatList
                        optionPressed={optionPressed} messages={messages}
                        scrollTextRef={scrollTextRef} senderID={senderID}>
                    </ChatList>
                    <ControlBar
                        text={text} inputBarRef={inputBarRef}
                        handleMessageBarChange={handleMessageBarChange} sendMessage={sendMessage}>
                    </ControlBar>
                </div>
            </div>
        </div>

    );
}



function TopBar({
    optionPressed,
    setOptionPressed
}) {

    const { threadName } = useAppContext();

    const Router = useRouter();
    return (
        <div className={styles.chat_top_bar}>
            <div className={styles.top_bar_left}>
                <div className={styles.home_button_holder}>
                    <div className={`${styles.home_button} ${styles.pc}`}>
                        <img onClick={() => {
                            Router.push("/dashboard");
                        }} alt="" src={"../home_icon.png"} />
                    </div>
                    <div className={`${styles.home_button} ${styles.mobile}`}>
                        <img onClick={() => {
                            Router.push("/chatter");
                        }} alt="" src={"../chatter_icon.png"} />
                    </div>
                </div>
                <div className={styles.page_title_holder}>
                    <p className={styles.page_title}>{"Chat"}</p>
                </div>
                <div className={styles.option_button_holder}>
                    <div className={`${styles.option_button} ${styles.pc}`} onClick={() => {
                        Router.push("/chatter");
                    }} >
                        <img alt="" src={"../chatter_icon.png"} />
                    </div>
                    <div className={`${styles.option_button} ${styles.mobile}`}>
                        <img onClick={() => setOptionPressed(!optionPressed)} alt=""
                            src={"../chat_option_icon.png"} />
                    </div>
                </div>
            </div>
            <div className={styles.top_bar_right}>
                <p className={styles.thread_title}>{threadName}</p>
            </div>
        </div>
    );
}


function OptionBar({
    settingSelected,
    setSettingsSelected,
    contextMessages,
    handleSearch,
    report,
    setReport,
    recieverID

}) {
    let Router = useRouter();
    return (
        <div className={styles.chat_options}>
            <div className={styles.option_container}>
                <div className={styles.chat_option_container}>
                    <div onClick={() => {
                        setSettingsSelected(false)
                        setReport(false)
                    }}
                        className={`${styles.search_option}
                     ${!settingSelected ? styles.selected_option : styles.no_style}`}>
                        <img alt="" src={"../cross_icon.png"} />
                    </div>
                    <div onClick={() => setSettingsSelected(true)}
                        className={`${styles.settings_option} 
                    ${!settingSelected ? styles.no_style : styles.selected_option}`}>
                        <img alt="" src={"../chat_option_icon.png"} />
                    </div>
                </div>
            </div>
            {
                settingSelected ?
                    (
                        <>
                            <div className={styles.mobile_chat_setting_image}>
                                <img alt="" src={"../default_profile_pic.png"} />
                            </div>
                            <div className={styles.mobile_chat_setting_container}>

                                <div className={styles.mobile_chat_setting} onClick={(event) => { }}>

                                    <div className={styles.context_profile_picture_container}>
                                        <img alt="" src={"../profile.png"} />
                                    </div>
                                    <div className={styles.context_threadname_container}
                                        onClick={() => {
                                            Router.push(`/visit/${recieverID}`);
                                        }}
                                    >
                                        <p>View Profile</p>
                                    </div>
                                </div>
                                <div className={styles.mobile_chat_setting} onClick={(event) => { }}>
                                    <div className={styles.context_profile_picture_container}>
                                        <img alt="" src={"../block.png"} />
                                    </div>
                                    <div className={styles.context_threadname_container}>
                                        <p>Block User</p>
                                    </div>
                                </div>
                                <div className={styles.mobile_chat_setting} onClick={(event) => { setReport(true) }}>
                                    <div className={styles.context_profile_picture_container}>
                                        <img alt="" src={"../report.png"} />
                                    </div>
                                    <div className={styles.context_threadname_container}>
                                        <p>Report User</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) :
                    (
                        <>
                            <SearchBar
                                handleSearch={handleSearch}>
                            </SearchBar>
                            <SearchList
                                contextMessages={contextMessages}>
                            </SearchList>
                        </>
                    )
            }
        </div>

    );
}

function ChatList({
    optionPressed,
    messages,
    scrollTextRef,
    senderID
}) {
    return (
        <div className={`${styles.chat_list}  
        ${optionPressed ? styles.invinsible : styles.no_style}`}>
            {
                messages.map((currentMessage) =>
                    <Message key={currentMessage?.messageID} currentMessage={currentMessage} senderID={senderID} />
                )
            }
            <div ref={scrollTextRef}></div>
        </div>

    );
}

function ControlBar({
    handleMessageBarChange,
    sendMessage,
    inputBarRef,
    text
}) {

    return (
        <div spellCheck="false" className={styles.chat_control_bar}>
            <div className={styles.message_bar_holder}>
                <InputEmoji className={styles.message_bar}
                    ref={inputBarRef}
                    borderColor={"#ffffff"}
                    height={60}
                    placeholder="Text"
                    spellcheck="false"
                    fontSize={17}
                    value={text}
                    onChange={handleMessageBarChange}
                    onEnter={sendMessage}
                />
            </div>
            <div className={styles.control_button_holder}>
                <div className={styles.message_submit_button}
                    onClick={sendMessage}>Send</div>
            </div>
        </div>
    );

}
function SearchBar({
    handleSearch
}) {
    return (
        <div className={styles.searchbar_container}>
            <input
                type="text"
                placeholder="Search"
                className={styles.searchbar}
                onChange={(e) => { handleSearch(e) }} />
        </div>
    )

}
function SearchList({
    contextMessages
}) {
    return (
        <div className={styles.search_result_container}>
            {
                contextMessages.map((context, index) =>
                    <SearchResult
                        key={index || context.userID || context.groupID} context={context}>
                    </SearchResult>
                )
            }
        </div>

    )
}
function SearchResult({
    context,
    index
}) {
    let { setRecieverID, appLevelChange, setAppLevelChange, setThreadName } = useAppContext();
    const router = useRouter();
    return (
        <div className={styles.search_result}
            onClick={(event) => {
                localStorage.setItem("recieverID", JSON.stringify(context?.userID));
                localStorage.setItem("threadName", JSON.stringify(context?.threadName));
                router.push(`/chat/${context?.userID}`);
                setRecieverID(context?.userID);
                setThreadName(context?.threadName);
                setAppLevelChange(!appLevelChange);
            }}
        >
            <div className={styles.context_profile_picture_container}>
                <img alt="" src={"../default_profile_pic.png"} />
            </div>
            <div className={styles.context_threadname_container}>
                <p>   {context?.threadName} </p>
            </div>
        </div>
    )
}

function Message({
    currentMessage,
    senderID
}) {

    return (
        <div
            className={` ${styles.message_container}
               ${currentMessage?.senderID === senderID ? styles.self : ''}`}>
            <div className={styles.message_main}>
                <div className={styles.message_header_container}>
                    <div className={styles.message_metadata_holder}>
                        <p className={styles.profile_name}>{currentMessage?.senderName}</p>
                    </div>
                </div>
                <div className={`${styles.message}`}>
                    {currentMessage?.messageText}
                </div>
            </div>
        </div>
    )
}
