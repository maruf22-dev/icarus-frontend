import React, { useEffect, useState } from 'react'
import styles from '../../styles/visit.module.css'
import mobile_styles from '../../styles/visit_mobile.module.css'
import router, { useRouter } from 'next/router'

const USERTYPE =
{
    RENTER: 'RENTER',
    LISTER: 'LISTER'
}
function Profile() {


    const [basicUserInfo, setBasicUserInfo] = useState({
        id: "",
        name: "",
        bio: "",
        type: USERTYPE.RENTER,
        numberOfApartments: 0,
        livesIn: ""
    });
    const [contactInfo, setContactInfo] = useState({
        mobile: "",
        email: "",
    });

    useEffect(() => {
        setBasicUserInfo({
            id: "asdasd",
            name: "Abidur Rahman Khandakar Abir",
            bio: "I am a chutiya, I am a proud Chutiya and lorem ipsum clum ssowrilal",
            type: USERTYPE.LISTER,
            numberOfApartments: 4,
            livesIn: "Bashundhara, Dhaka"
        });
        setContactInfo({
            mobile: "01726442155",
            email: "amichutiya@chutiya.com",
        });

    }, [])

    return (
        <Page basicUserInfo={basicUserInfo}></Page>
    )
}

function Page({ basicUserInfo }) {
    return (
        <>
            <PC basicUserInfo={basicUserInfo}></PC>
            <Mobile></Mobile>
        </>
    )
}

function PC({ basicUserInfo }) {
    return (
        <div className={styles.visit_page}>
            <Topbar basicUserInfo={basicUserInfo}></Topbar>
            <Main basicUserInfo={basicUserInfo}></Main>
        </div>
    )
}


function Topbar({ basicUserInfo }) {
    let router = useRouter();
    return (
        <div className={styles.top_bar}>
            <div className={styles.top_bar_left}>
                <div className={styles.profile_image_container}>
                    <img alt="" src={"../default_profile_pic.png"} onClick={() => {
                    }} />
                </div>
                <div className={styles.profile_card}>
                    <div className={styles.top_name_container}>
                        {basicUserInfo.name}
                    </div>
                    <div className={styles.top_bio_container}>
                        <div className={styles.label_container}>
                            <p>Bio</p>
                        </div>
                        <p> {basicUserInfo.bio}</p>
                    </div>
                </div>
            </div>
            <div className={styles.top_bar_right}>
                <div>
                    <img alt="" src={"../home_icon.png"} onClick={() => {
                        router.push('/dashboard');

                    }} />
                </div>
                <div>
                    <img alt="" src={"../chatter_icon.png"} onClick={() => {
                        router.push(`/chat/${basicUserInfo.id}`);
                    }} />
                </div>
                <div>
                    <img alt="" src={"../back_button.png"} onClick={() => {
                        router.back();
                    }} />
                </div>
            </div>
        </div>
    )

}

function Main({ basicUserInfo }) {
    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.info}>
                    <div className={styles.label_container}>
                        <p>Info</p>
                    </div>
                </div>
                <div className={styles.contact}>
                    <div className={styles.label_container}>
                        <p> Contanct</p>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <ListingsContainer basicUserInfo={basicUserInfo}></ListingsContainer>
            </div>
        </div>

    );
}
function ListingsContainer({ basicUserInfo }) {


    const [listings, setListings] = useState([]);

    useEffect(() => {
        if (basicUserInfo.name !== "") {
            setListings([1, 2, 3]);
        }
    }, [basicUserInfo])
    return (
        <>            {
            (basicUserInfo.type === USERTYPE.LISTER) ?
                (<div> {listings.map((current, index) => <Listing key={index} current={current}></Listing>)} </div>) :
                (<div>The user is not a lister</div>)
        }
        </>
    )
}
function Listing({ current }) {
    return (
        <div>
            {current}
        </div>
    )
}


function Mobile() {
    return (
        <div className={mobile_styles.visit_page}>
            Mobile
        </div>
    )
}

export default Profile

