import React, { useEffect, useState } from 'react'
import styles from '../../styles/visit.module.css'
import router, { useRouter } from 'next/router'
import axios from 'axios';

const USERTYPE =
{
    RENTER: 'RENTER',
    LISTER: 'LISTER'
}
function Profile({pageProfile}) {

    console.log(pageProfile);



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
            name: pageProfile.name,
            bio: pageProfile.bio,
            type: pageProfile.usertype,
            numberOfApartments: 4,
            livesIn: pageProfile.address,
            profession: pageProfile.occupation,
            rating: "4"
        });
        setContactInfo({
            mobile: pageProfile.phone,
            email: pageProfile.email,
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



export const getServerSideProps = async pageContext => {
    const notApplicable =
    {
        notFound: true
    }
    const pageProfileID = pageContext.query.profileid;
    console.log(pageProfileID);

    let BACKEND_URL;
    let SQL_DB_INFO;
    BACKEND_URL = 'https://icarus-backend.herokuapp.com'
    SQL_DB_INFO = 'WEB';


    let URL = `${BACKEND_URL}/api/v1/database/getuser?HOST=${SQL_DB_INFO}`;
    let result = await axios.post(
        URL,
        {
        }
    );
    let pageProfile = null;
    let array = null;
    array = result?.data?.data?.data;
    if(!array) return notApplicable;

    if (array && pageProfileID !== "") {
        for (let i = 0; i < array.length; i++) {
            if (array[i].userID === pageProfileID) {
                pageProfile = {
                    name: array[i].name,
                    bio: array[i].bio,
                    email: array[i].email,
                    phone: array[i].phoneNumber,
                    occupation: array[i].occupation,
                    address: array[i].address,
                    usertype: array[i].usertype,
                };
                break;
            }
        }
    }

    if(pageProfile === null) return notApplicable;

    console.log(pageProfile);


    return { props: { pageProfile: pageProfile } }

    // try {
    //     if (articleData !== undefined) {
    //         return notApplicable;
    //     }
    //     const props = { pageProfileID: slug };
    //     return { props: props };
    // }
    // catch (err) {
    //     return notApplicable;
    // }
};

export default Profile

