import React, { useEffect, useState } from 'react'
import styles from '../../styles/visit.module.css'
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
        livesIn: "",
        profession: "",
        rating: ""
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
            livesIn: "Bashundhara, Dhaka",
            profession: "student",
            rating: "4"
        });
        setContactInfo({
            mobile: "01726442155",
            email: "amichutiya@chutiya.com",
        });

    }, [])

    return (
        <Page basicUserInfo={basicUserInfo} contactInfo={contactInfo}></Page>
    )
}

function Page({ basicUserInfo, contactInfo }) {
    return (
        <>
            <div className={styles.visit_page}>
                <Topbar basicUserInfo={basicUserInfo}></Topbar>
                <Main basicUserInfo={basicUserInfo} contactInfo={contactInfo}></Main>
            </div>
        </>
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

function Main({ basicUserInfo, contactInfo }) {
    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.contact}>
                    <div className={styles.label_container}>
                        <p> Contanct</p>
                    </div>
                    <div className={styles.contact_main}>
                        <p>Email : {contactInfo.email}</p>
                        <p>Number : {contactInfo.mobile}</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.label_container}>
                        <p>Info</p>
                    </div>
                    <div className={styles.info_main}>
                        <p>Occupation: {basicUserInfo.profession}</p>
                        <p>
                            {
                                (basicUserInfo.type === USERTYPE.LISTER) ?
                                    "Listed " : "Rented "
                            }
                            {
                                basicUserInfo.numberOfApartments
                            }
                            {
                                " Appartments"
                            }
                        </p>
                        <p>Lives in: {basicUserInfo.livesIn}</p>
                        {
                            (basicUserInfo.type === USERTYPE.LISTER) ?
                                (<p>Lister Rating : {basicUserInfo.rating} </p>)
                                : (<></>)
                        }
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
            setListings([
                {
                    address: "88/a",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "bashundhara dhaka, 88b jhasd ashdkjh kashdkjashd khasdkh askhd kjashdkh asdkh kashdkh askdhk kasdhjk kjhasdkh askdhk sajdh askdjhkashd aksdhaskdh askhd kjashdkh asdkh kashdkh askdhk kasdhjk kjhasdkh askdhk sajdh askdjhkashd aksdhaskdh askhd kjashdkh asdkh kashdkh askdhk kasdhjk kjhasdkh askdhk sajdh askdjhkashd aksdhaskdh ",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
                {
                    address: "kjsndad azkjd",
                    size: "1200sq/ft",
                    rent: "1200",
                    bed: "3",
                    bath: "2",
                },
            ]);
        }
    }, [basicUserInfo])
    return (
        <>            {
            (basicUserInfo.type === USERTYPE.LISTER) ?
                (<div>
                    <div className={styles.listing_name_container}>
                        <p>
                            Previous Listings:
                        </p>
                    </div>
                    <div> {listings.map((current, index) => <Listing key={index} current={current}></Listing>)} </div>
                </div>)
                :
                (<div>The user is not a lister</div>)
        }
        </>
    )
}
function Listing({ current }) {
    return (
        <div className={styles.listing}>
            <p>
                Address : {current.address}
            </p>
            <p>
                Size : {current.size}
            </p>
            <p>
                Rent : {current.rent}
            </p>
            <p>
                {current.bed} Bed and {current.bath} Bath.
            </p>
        </div>
    )
}


export default Profile

