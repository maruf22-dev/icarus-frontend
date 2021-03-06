import { useRouter } from 'next/router'
import { React, useEffect, useState } from 'react'
import styles from '../styles/profile.module.css'
import { AppContext, useAppContext } from '../context/AppContext';
import axios from 'axios';


const USERTYPE =
{
    RENTER: 'RENTER',
    LISTER: 'LISTER'
}

let BACKEND_URL;
let SQL_DB_INFO;
BACKEND_URL = 'https://icarus-backend.herokuapp.com'
SQL_DB_INFO = 'WEB';

const Profile = () => {
    const router = useRouter();
    const { appLevelChange, setAppLevelChange, setLoggedIn, loggedIn, profileID } = useAppContext();
    const [info, setInfo] = useState({
        name: '',
        bio: '',
        email: '',
        phone: '',
        occupation: '',
        address: '',
        usertype: USERTYPE.RENTER,
    });
    const [barPressed, setBarPressed] = useState(false);
    const [NameEditPressed, setNameEditPressed] = useState(null);
    const [BioEditPressed, setBioEditPressed] = useState(null);
    const [ContactEditPressed, setContactEditPressed] = useState(null);
    const [InfoEditPressed, setInfoEditPressed] = useState(null);


    useEffect(async () => {



        let URL = `${BACKEND_URL}/api/v1/database/getuser?HOST=${SQL_DB_INFO}`;
        let result = await axios.post(
            URL,
            {
            }
        );

        let array = null;
        array = result?.data?.data?.data;
        if (array && profileID !== "") {
            for (let i = 0; i < array.length; i++) {
                if (array[i].userID === profileID) {

                    setInfo({
                        name: array[i].name,
                        bio: array[i].bio,
                        email: array[i].email,
                        phone: array[i].phoneNumber,
                        occupation: array[i].occupation,
                        address: array[i].address,
                        usertype: array[i].usertype,
                    });

                    console.log(array[i]);
                    break;
                }
            }

        }

    }, [profileID]);


    useEffect(async () => {
        if ((InfoEditPressed === false || BioEditPressed === false || NameEditPressed === false || ContactEditPressed === false) &&
            (profileID !== "" && info && info.name !== '')) {
            console.log('change it');
            let URL = `${BACKEND_URL}/api/v1/database/updateprofile?HOST=${SQL_DB_INFO}`;
            let result = await axios.post(
                URL,
                {
                    profilepic: null,
                    username: info.name,
                    bio: info.bio,
                    phone: info.phone,
                    email: info.email,
                    occupation: info.occupation,
                    address: info.address,
                    usertype: info.usertype,
                    userID: profileID
                }
            );
        }
    }, [profileID, InfoEditPressed, BioEditPressed, ContactEditPressed, NameEditPressed])

    useEffect(() => {
        const verified = localStorage.getItem('loggedIn');
        window.addEventListener('storage', () => {
            if (JSON.parse(verified) === false) router.push("/entrance");
        })
        if (JSON.parse(verified) === false) router.push("/entrance");
    }, [])

    return (
        barPressed ?
            (
                <>
                    <div className={styles.mobile_links}>
                        <div className={styles.mobile_link_item}>
                            <div className={styles.mobile_link_text}>
                                <p>Domus</p>
                            </div>
                            <div className={styles.mobile_link_button}>
                                <img alt="" src={"../back_button.png"} onClick={() => { setBarPressed(false) }} />
                            </div>
                        </div>

                        <div className={styles.mobile_link_item}>
                            <div className={styles.mobile_link_text}>
                                <p>Maps</p>
                            </div>
                            <div className={styles.mobile_link_button}>
                                <img alt="" src={"../nav_maps.png"} onClick={() => { router.push("/map") }} />
                            </div>
                        </div>

                        <div className={styles.mobile_link_item}>
                            <div className={styles.mobile_link_text}>
                                <p>Chat</p>
                            </div>
                            <div className={styles.mobile_link_button}>
                                <img alt="" src={"../chatter_icon.png"} onClick={() => { router.push("/chatter") }} />
                            </div>
                        </div>


                        <div className={styles.mobile_link_item}>
                            <div className={styles.mobile_link_text}>
                                <p>Dashboard</p>
                            </div>
                            <div className={styles.mobile_link_button}>
                                <img alt="" src={"../home_icon.png"} onClick={() => { router.push("/dashboard") }} />
                            </div>
                        </div>

                        <div className={styles.mobile_link_item}>
                            <div className={styles.mobile_link_text}>
                                <p>Log Out</p>
                            </div>
                            <div className={styles.mobile_link_button}>
                                <img alt="" src={"../nav_logout.png"} onClick={() => {
                                    setLoggedIn(false);
                                    setAppLevelChange(!appLevelChange);
                                    router.push("/entrance");
                                }} />
                            </div>
                        </div>
                    </div>
                </>
            ) :

            <div className={styles.profile_page}>
                <div className={styles.navbar}>
                    <div className={styles.navlinks}>
                        <img alt="" src={"../nav_maps.png"} onClick={() => { router.push("/map") }} />
                        <img alt="" src={"../chatter_icon.png"} onClick={() => { router.push("/chatter") }} />
                        <img alt="" src={"../home_icon.png"} onClick={() => { router.push("/dashboard") }} />
                    </div>
                    <div>
                    </div>
                    <div className={styles.app_title}>
                        <p>Self Profile</p>
                        {
                            (info && info.usertype === USERTYPE.LISTER) ?
                                <img alt="" src={"../add.png"} onClick={() => { router.push("/add-listing") }} />
                                :
                                <></>
                        }
                    </div>
                    <div className={styles.logout}>
                        <div></div>
                        <img alt="" src={"../nav_logout.png"}
                            onClick={() => {
                                setLoggedIn(false);
                                setAppLevelChange(!appLevelChange);
                                router.push("/entrance");
                            }} />
                        <div></div>
                    </div>
                    <div className={styles.mobile_button}>
                        <img alt="" src={"../nav_hamburger.png"} onClick={() => { setBarPressed(true) }} />
                    </div>
                </div>


                <div className={styles.identity}>
                    <div className={styles.imageholder}>
                        <img className={styles.profile_image} alt="" src={"../default_profile_pic.png"} />
                        <div className={styles.profile_edit_image}>
                            <img alt="" src={"../edit.png"} />
                        </div>
                    </div>

                    <div className={styles.identity_main}>
                        <div className={styles.identity_detail}>

                            <div className={styles.identity_name}>
                                {
                                    NameEditPressed ?
                                        <>
                                            <input
                                                value={info?.name} placeholder={"Name"}
                                                spellCheck="false"
                                                onChange={(e) => {
                                                    setInfo({
                                                        ...info,
                                                        name: e.target.value,
                                                    })
                                                }} />
                                        </>
                                        :
                                        <p>
                                            {info?.name}
                                        </p>
                                }
                            </div>
                            {
                                NameEditPressed ?
                                    <div className={styles.identity_edit_image}>
                                        <img alt="" src={"../edit_tick.png"} onClick={() => { setNameEditPressed(false) }} />
                                    </div>
                                    :
                                    <div className={styles.identity_edit_image}>
                                        <img alt="" src={"../edit.png"} onClick={() => { setNameEditPressed(true) }} />
                                    </div>

                            }



                        </div>
                        <div className={styles.identity_detail}>
                            <div className={styles.identity_bio}>

                                {
                                    BioEditPressed ?
                                        <>
                                            <input value={info?.bio}
                                                placeholder={"Bio"}
                                                onChange={(e) => {
                                                    setInfo({
                                                        ...info,
                                                        bio: e.target.value,
                                                    })
                                                }}
                                            />
                                        </>
                                        :
                                        <p>
                                            {info?.bio}
                                        </p>
                                }

                            </div>
                            {
                                BioEditPressed ?
                                    <div className={styles.identity_edit_image}>
                                        <img alt="" src={"../edit_tick.png"} onClick={() => { setBioEditPressed(false) }} />
                                    </div>
                                    :
                                    <div className={styles.identity_edit_image}>
                                        <img alt="" src={"../edit.png"} onClick={() => { setBioEditPressed(true) }} />
                                    </div>

                            }


                        </div>
                    </div>
                </div>


                <div className={styles.bottom_container}>
                    <div className={styles.contact}>
                        <div className={styles.contact_title}>
                            <p>
                                Contact
                            </p>
                        </div>
                        <div className={styles.contact_email}>
                            {
                                !ContactEditPressed &&
                                <p> {"E-mail :"} &nbsp;&nbsp;&nbsp;  {info?.email} </p>
                            }
                            {
                                ContactEditPressed &&

                                <div className={styles.edit_field_container}>
                                    <div className={styles.input_field_name}>
                                        <p>
                                            {"E-mail :"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                    </div>
                                    <div className={styles.field_input}>


                                        <input value={info?.email} placeholder={"E-mail"} onChange={(e) => {
                                            setInfo({
                                                ...info,
                                                email: e.target.value,
                                            })
                                        }} />
                                    </div>
                                </div>

                            }
                        </div>
                        <div className={styles.contact_phone}>

                            {
                                !ContactEditPressed &&
                                <p>
                                    {"Phone :"}&nbsp;&nbsp;  {info?.phone}
                                </p>
                            }
                            {
                                ContactEditPressed &&

                                <div className={styles.edit_field_container}>
                                    <div className={styles.input_field_name}>
                                        <p>
                                            {"Phone :"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                    </div>
                                    <div className={styles.field_input}>
                                        <input value={info?.phone} placeholder={"Phone"} onChange={(e) => {
                                            setInfo({
                                                ...info,
                                                phone: e.target.value,
                                            })
                                        }} />
                                    </div>
                                </div>


                            }

                        </div>
                        <div className={styles.contact_edit_container}>
                            {!ContactEditPressed && <img alt="" src={"../edit.png"} onClick={() => { setContactEditPressed(true) }} />}
                            {ContactEditPressed && <img alt="" src={"../edit_tick.png"} onClick={() => { setContactEditPressed(false) }} />}
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.info_title}>
                            <p>
                                Info
                            </p>
                        </div>
                        <div className={styles.info_occupation}>
                            {
                                !InfoEditPressed &&
                                <p>
                                    {"Occupation:"}&nbsp;&nbsp;&nbsp;{info?.occupation}
                                </p>
                            }
                            {
                                InfoEditPressed &&


                                <div className={styles.edit_field_container}>
                                    <div className={styles.input_field_name}>
                                        <p>
                                            {"Occupation:"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                    </div>
                                    <div className={styles.field_input}>
                                        <input value={info?.occupation}
                                            spellCheck="false"
                                            placeholder={"Occupation"} onChange={(e) => {
                                                setInfo({
                                                    ...info,
                                                    occupation: e.target.value,
                                                })
                                            }} />
                                    </div>
                                </div>



                            }
                        </div>
                        <div className={styles?.info_address}>
                            {
                                !InfoEditPressed &&
                                <p>
                                    {"Address:"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {info?.address}
                                </p>
                            }
                            {
                                InfoEditPressed &&
                                <>
                                    <div className={styles.edit_field_container}>
                                        <div className={styles.input_field_name}>
                                            <p>
                                                {"Address:"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </p>
                                        </div>
                                        <div className={styles.field_input}>
                                            <input value={info?.address}
                                                spellCheck="false"
                                                placeholder={"Address"} onChange={(e) => {
                                                    setInfo({
                                                        ...info,
                                                        address: e.target.value,
                                                    })
                                                }} />
                                        </div>
                                    </div>
                                </>

                            }

                        </div>
                        <div className={styles.info_usertype}>
                            {
                                !InfoEditPressed &&
                                <p>
                                    {"User Type:"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {info?.usertype?.toLowerCase()}
                                </p>

                            }
                            {
                                InfoEditPressed &&
                                <div className={styles.edit_field_container}>
                                    <div className={styles.input_field_name}>
                                        <p>
                                            {"User Type:"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                    </div>
                                    <div className={styles.field_input}>
                                        <div className={styles.user_type_button}

                                            onClick={() => {
                                                if (info?.usertype === USERTYPE.LISTER) {
                                                    setInfo({
                                                        ...info,
                                                        usertype: USERTYPE.RENTER
                                                    })
                                                }
                                                else {
                                                    setInfo({
                                                        ...info,
                                                        usertype: USERTYPE.LISTER
                                                    })
                                                }
                                            }}
                                        >

                                            {info?.usertype === USERTYPE.LISTER ? "Lister" : "Renter"}
                                        </div>
                                    </div>
                                </div>

                            }

                        </div>
                        <div className={styles.info_edit_container}>
                            {
                                !InfoEditPressed && <img alt="" src={"../edit.png"} onClick={() => { setInfoEditPressed(true) }} />
                            }
                            {
                                InfoEditPressed && <img alt="" src={"../edit_tick.png"} onClick={() => { setInfoEditPressed(false) }} />
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default Profile