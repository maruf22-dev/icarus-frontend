import { useRouter } from 'next/router'
import { React, useEffect, useState } from 'react'
import styles from '../styles/profile.module.css'

const Profile = () => {
    const [info,setInfo]=useState(null)
    useEffect(() => {
        setInfo({
            name:'Abidur Rahkman Khandokar Abir',
            bio: 'I am a chutiya, I am a proud Chutiya and lorem ipsum clum ssowrilal',
        })
    }, [])
    return (
        <div className={styles.profile_page}>



            <div className={styles.navbar}>
                <div className={styles.navlinks}>
                    <img alt="" src={"../nav_maps.png"} />
                    <img alt="" src={"../chatter_icon.png"} onClick={() => { router.push("/chatter") }} />
                    <img alt="" src={"../home_icon.png"} />
                </div>
                <div>
                </div>
                <div className={styles.app_title}>
                    <p>Self Profile</p>
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
                            {info?.name}
                        </div>
                        <div className={styles.identity_edit_image}>
                            <img alt="" src={"../edit.png"} />
                        </div>
                    </div>
                    <div className={styles.identity_detail}>
                        <div className={styles.identity_bio}>
                            {info?.bio}
                        </div>
                        <div className={styles.identity_edit_image}>
                            <img alt="" src={"../edit.png"} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Profile