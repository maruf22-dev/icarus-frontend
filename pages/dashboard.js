import { useRouter } from 'next/router'
import { React, useEffect } from 'react'
import styles from '../styles/dashboard.module.css'
import { AppContext, useAppContext } from '../context/AppContext';


const Dashboard = () => {
    const router = useRouter();
    const { appLevelChange, setAppLevelChange, setLoggedIn, loggedIn } = useAppContext();
    useEffect(() => {
        const verified = localStorage.getItem('loggedIn');
        window.addEventListener('storage', () => {
            if (JSON.parse(verified) === false) router.push("/entrance");
        })
        if (JSON.parse(verified) === false) router.push("/entrance");
    }, [])

    return (
        <>
            <div className={styles.main}>

                <div className={styles.navbar}>
                    <div className={styles.navlinks}>
                        <img alt="" src={"../nav_maps.png"} />
                        <img alt="" src={"../chatter_icon.png"} />
                        <img alt="" src={"../nav_profile.png"} />
                    </div>
                    <div>
                    </div>
                    <div className={styles.app_title}>
                        <p>Domus</p>
                    </div>
                    <div>
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
                                {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                            </p>
                        </div>
                        <div className={styles.info_para}>
                            <p>
                                {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}

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
            </div>








            {/* <div>
            <h1>Dashboard</h1>
            <p onClick={() => { router.push('/chatter') }}>go to chatter</p>
            <p
                onClick={() => {
                    setLoggedIn(false);
                    setAppLevelChange(!appLevelChange);
                    router.push("/entrance");
                }}>log out</p>

        </div> */}
        </>



    )
}

export default Dashboard
