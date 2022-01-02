import { useRouter } from 'next/router';    
import { React, useEffect, useState } from 'react';
import styles from '../styles/dashboard.module.css';
import { AppContext, useAppContext } from '../context/AppContext';


const Dashboard = () => {
    const router = useRouter();
    const { appLevelChange, setAppLevelChange, setLoggedIn, loggedIn } = useAppContext();
    const [barPressed, setBarPressed] = useState(false);
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
                                <img alt="" src={"../nav_maps.png"} onClick={() => { router.push("/map") }}/>
                            </div>
                        </div>

                        <div className={styles.mobile_link_item}>
                            <div className={styles.mobile_link_text}>
                                <p>Chat</p>
                            </div>
                            <div className={styles.mobile_link_button}>
                                <img alt="" src={"../chatter_icon.png"} />
                            </div>
                        </div>


                        <div className={styles.mobile_link_item}>
                            <div className={styles.mobile_link_text}>
                                <p>Profile</p>
                            </div>
                            <div className={styles.mobile_link_button}>
                                <img alt="" src={"../nav_profile.png"}  onClick={() => { router.push("/profile") }}/>
                            </div>
                        </div>

                        <div className={styles.mobile_link_item}>
                            <div className={styles.mobile_link_text}>
                                <p>Log Out</p>
                            </div>
                            <div className={styles.mobile_link_button}>
                                <img alt="" src={"../nav_logout.png"} />
                            </div>
                        </div>


                    </div>
                </>
            ) :
            (
                <>
                    <div className={styles.main}>
                        <div className={styles.navbar}>
                            <div className={styles.navlinks}>
                                <img alt="" src={"../nav_maps.png"} onClick={() => { router.push("/map") }}/>
                                <img alt="" src={"../chatter_icon.png"} onClick={() => { router.push("/chatter") }} />
                                <img alt="" src={"../nav_profile.png"} onClick={() => { router.push("/profile") }}/>
                            </div>
                            <div>
                            </div>
                            <div className={styles.app_title}>
                                <p>Domus</p>
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
                        <div className={styles.landing}>
                            <div className={styles.landing_top_container}>
                                <div></div>
                                <div className={styles.home_container}>Homes</div>
                                <div></div>
                            </div>
                            <div className={styles.landing_bottom_container}>
                                <div>
                                </div>
                                <div className={styles.landing_bottom_img_container}>
                                    <div className={styles.landing_item}>
                                        <div className={styles.landing_item_image}>
                                            <img alt="" src={"../landing_appartment.png"} />
                                        </div>
                                        <div className={styles.landing_item_text}>
                                            <p>Apartments</p>
                                        </div>
                                    </div>
                                    <div className={styles.landing_item}>
                                        <div className={styles.landing_item_image}>
                                            <img alt="" src={"../nav_maps.png"} />
                                        </div>
                                        <div className={styles.landing_item_text}>
                                            <p>Maps</p>
                                        </div>
                                    </div>
                                    <div className={styles.landing_item}>
                                        <div className={styles.landing_item_image}>
                                            <img alt="" src={"../landing_discussion.png"} />
                                        </div>
                                        <div className={styles.landing_item_text}>
                                            <p>Discussion</p>
                                        </div>
                                    </div>

                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.info_part}>
                            <div className={styles.info_grid}>
                                <div className={styles.info_para_main}>
                                    <p>
                                        {"Finding a place to live in Bashundhara R/A as a student could be quite intimidating at times. Nobody likes walking block after block, finding a suitable apartment only to know that the price is way above the budget. Yet, those apartments might not have sufficient space, the number of rooms, or could be miles away from the university. Moreover, if you’re in search of just a single/shared room, luck might hit you the other way round. The valuable time, energy, and other resources spent for renting an apartment are totally not worth it."}
                                    </p>
                                </div>
                                <div className={styles.info_para}>
                                    <p>
                                        {"We’ve also faced this and we got u covered. Domus offers you a whole new way of searching for rental places. From basic listings with images (which you generally find on Facebook) to surfing in a Map and talking with the renter directly within the app, the process is easier than ever. You can even apply different filters (Rooms, Size, Price, Block, etc.) while you look for your place. Furthermore, you can get information about the renter - his/her listing ratings, previous listings, and contact info. It's easy - Sign Up. Verify. Search."}

                                    </p>
                                </div>
                            </div>
                            <div className={styles.contact_container}>
                                <div className={styles.contact_main}>
                                    <div></div>
                                    <div className={styles.contact}>Contact</div>
                                    <div></div>
                                </div>
                                <div className={styles.gmail_container}>
                                    {"domus_email@gmail.com"}
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            )



    )
}

export default Dashboard
