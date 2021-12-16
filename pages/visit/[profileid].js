import React from 'react'
import styles from '../../styles/visit.module.css'

function Profile() {
    return (
        <div className={styles.visit_page}>
            <Topbar></Topbar>
            <Main></Main>
        </div>
    )
}

function Topbar() {
    return (
        <div className={styles.top_bar}>
            <div className={styles.top_bar_left}>
                <div className={styles.profile_image_container}>
                    <img onClick={() => {
                    }} alt="" src={"../default_profile_pic.png"} />
                </div>
                <div className={styles.profile_card}>
                    <div>
                        Name
                    </div>
                    <div>
                        Bio
                    </div>
                </div>
            </div>
            <div className={styles.top_bar_right}>
                <div>
                    a
                </div>
                <div>
                    b
                </div>
                <div>
                    c
                </div>
            </div>
        </div>
    )

}

function Main() {
    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.info}>
                    info
                </div>
                <div className={styles.contact}>
                    contanct
                </div>

            </div>
            <div className={styles.right}>
            </div>

        </div>

    );
}

export default Profile
