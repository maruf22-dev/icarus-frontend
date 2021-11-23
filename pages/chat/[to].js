import styles from '../../styles/chat.module.css'
const io = require("socket.io-client");
import InputEmoji from 'react-input-emoji';
import { useState, useEffect, useRef} from 'react'
import { v4 as uuid } from 'uuid'
import { AppContext, useAppContext } from '../../context/AppContext';
import { useContext } from 'react';
import Image from 'next/image'


const SOCKET_LINK = "https://icarus-backend.herokuapp.com";
const socket = io.connect(SOCKET_LINK);

export default function Chat(props) {


    let { profileName } = useAppContext();
    let { isGroup, senderID, receiverID, groupID, threadName } = props;
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    let scrollTextRef = useRef();


    let getFormattedDateFromMillis = (millis) => {
        let date = new Date(millis);
        return date.toLocaleString();
    }

    let getThreadId = (senderID, recieverID, groupID, isGroup) => {
        let computed = "thread_";
        if (isGroup) computed = groupID;
        else if (senderID < recieverID) computed = senderID + "_" + recieverID;
        else computed = recieverID + "_" + senderID;
        return computed;
    }


    let threadID = getThreadId(senderID, receiverID, groupID, isGroup);

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
    }

    useEffect(() => {
        console.log("Socket Changed");

        socket.on('connect', () => {
            console.log(`(Re/)connected with socket id ${socket.id} \n in thread ${threadID}`);
            socket.emit('join_thread', threadID);
        });

        socket.on("recieve_message", (recievedMessage) => {
            console.log("Recieved a new message from socket! \n");
            setMessages((messages) => [...messages, recievedMessage]);
        });
    }, [socket]);
    
    useEffect(()=>
    {
        scrollTextRef?.current?.scrollIntoView();;
    },[messages])


    return (
        <>
            <div className={styles.chat_page}>
                <div className={styles.chat_top_bar}>
                    <p className={styles.page_title}>{threadName}</p>
                </div>
                <div className={styles.chat_main}>
                    <div className={styles.chat_options}>
                    </div>
                    <div className={styles.chat_feed}>
                        <div className={styles.chat_list}>
                            {
                                messages.map((currentMessage) => {
                                    return (
                                        <div
                                            key={currentMessage?.messageID}
                                            className={styles.message_container}>
                                            <div className={styles.message_header_container}>
                                                <div className={styles.profile_image_holder}>
                                                    <img className={styles.profile_image} alt="" src={currentMessage?.profileImageLink || "../default_profile_pic.gif"}/>
                                                </div>
                                                <div className={styles.message_metadata_holder}>
                                                    <p className={styles.profile_name}>{currentMessage?.senderName}</p>
                                                    <p className={styles.message_timestamp}>{`${currentMessage?.senderID === senderID ? 'sent at' : 'recieved at'} ${getFormattedDateFromMillis(currentMessage?.timestamp)}`}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.message}  ${currentMessage?.senderID === senderID ? styles.self : ''}`}>
                                                {currentMessage?.messageText}
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
                                <button className={styles.submit_button} onClick={sendMessage}>💬</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
