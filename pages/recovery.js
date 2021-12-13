import React from 'react'
import router, { useRouter } from 'next/router'
import styles from '../styles/recovery.module.css'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Recovery = () => {


    const notify = (message) => toast.dark(message,
        {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
        });

    const Router = useRouter();

    const [showEmailChanger, setShowEmailChanger] = useState(true);
    const [showSecurityCodeComponent, setShowSecurityCodeComponent] = useState(false);
    const [showChangePasswordComponent, setShowChangePasswordComponent] = useState(false);


    function EmailChanger() {
        return (
            <div className={styles.email_changer}>
                <div className={styles.mobile_title_container}>
                    <p> {"Domus"} </p>
                </div>
                <div className={styles.title_container}>
                    <p>
                        {"Recover Password"}
                    </p>
                </div>
                <div className={styles.email_input_container}>
                    <div>
                        <input
                            placeholder="Enter your email"
                        />
                    </div>
                </div>
                <div className={styles.go_back_container}> <p onClick={() => { Router.push("/entrance") }} > Go Back </p> </div>
                <div className={styles.change_password_button_holder}>
                    <div className={styles.change_password_button} onClick={() => {
                        setShowEmailChanger(false);
                        setShowSecurityCodeComponent(true);
                        setShowChangePasswordComponent(false);
                        notify("There is no account assoisiated with this email");
                    }}> send confirmation </div>
                </div>
            </div>
        );
    }
    function SecurityCodeComponent() {
        return (
            <div className={styles.email_changer}>
                <div className={styles.mobile_title_container}>
                    <p> {"Domus"} </p>
                </div>
                <div className={styles.title_container}>
                    <p>
                        {"Recover Password"}
                    </p>
                </div>
                <div className={styles.email_input_container}>
                    <div>
                        <input
                            placeholder="Enter Security Code"
                        />
                    </div>
                </div>
                <div className={styles.go_back_container}>
                    <p onClick={() => {
                        setShowEmailChanger(true);
                        setShowSecurityCodeComponent(false);
                        setShowChangePasswordComponent(false);
                    }}>
                        {"Wrong Email?"}
                    </p> </div>
                <div className={styles.change_password_button_holder}>
                    <div className={styles.change_password_button}
                        onClick={() => {
                            notify("The code did not match the server. Check Again.");
                            setShowEmailChanger(false);
                            setShowSecurityCodeComponent(false);
                            setShowChangePasswordComponent(true);
                        }}>
                        {"Check Code"}
                    </div>
                </div>
            </div>
        );
    }

    function ChangePasswordComponent() {
        return (

            <div className={styles.email_changer}>
                <div className={styles.mobile_title_container}>
                    <p> {"Domus"} </p>
                </div>
                <div className={styles.title_container}>
                    <p>
                        {"Recover Password"}
                    </p>
                </div>
                <div className={styles.email_input_container}>
                    <div>
                        <input
                            placeholder="Enter New Password"
                        />
                    </div>
                </div>
                <div className={styles.go_back_container}>
                    <p onClick={() => {
                        setShowEmailChanger(true);
                        setShowSecurityCodeComponent(false);
                        setShowChangePasswordComponent(false);
                    }}>
                        {"Go Back"}
                    </p> </div>
                <div className={styles.change_password_button_holder}>
                    <div className={styles.change_password_button}
                        onClick={() => {
                            notify("The Password was changed");
                            setShowEmailChanger(false);
                            setShowSecurityCodeComponent(false);
                            setShowChangePasswordComponent(true);
                        }}>
                        {"Confirm"}
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
            <div className={styles.recovery_page}>

                {
                    showEmailChanger && (<EmailChanger></EmailChanger>)
                }
                {
                    showSecurityCodeComponent && (<SecurityCodeComponent></SecurityCodeComponent>)
                }
                {
                    showChangePasswordComponent && (<ChangePasswordComponent></ChangePasswordComponent>)
                }

                <>
                    <ToastContainer />
                </>

            </div>
            <div className={styles.recovery_app_title_container}>
                <div> {"Domus"} </div>
            </div>
        </>
    )
}

export default Recovery
