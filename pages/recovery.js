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


    function EmailChanger() {
        return (
            <div className={styles.email_changer}>
                <div className={styles.title_container}>
                    <div></div>
                    <div> {"Recover Password"} </div>
                </div>
                <div className={styles.email_input_container}>
                    <div>{"✉️ Email"}</div>
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
                        notify("There is no account assoisiated with this email");
                    }}> send confirmation </div>
                </div>
            </div>
        );
    }
    function SecurityCodeComponent() {
        return (
            <div className={styles.email_changer}>
                <div className={styles.title_container}>
                    <div></div>
                    <div> {"Recover Password"} </div>
                </div>
                <div className={styles.email_input_container}>
                    <div>{"🛡️ Security Code"}</div>
                    <div>
                        <input
                            placeholder="Enter Security Code"
                        />
                    </div>
                </div>
                <div className={styles.go_back_container}>
                    <p onClick={() => {
                        setShowSecurityCodeComponent(false);
                        setShowEmailChanger(true);
                    }}>
                        {"Wrong Email?"}
                    </p> </div>
                <div className={styles.change_password_button_holder}>
                    <div className={styles.change_password_button}
                        onClick={() => {
                            notify("The code did not match the server. Check Again.");
                        }}>
                        {"Check Code"}
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className={styles.recovery_page}>
            {
                showEmailChanger && (<EmailChanger></EmailChanger>)
            }
            {
                showSecurityCodeComponent && (<SecurityCodeComponent></SecurityCodeComponent>)
            }

            <>
                <ToastContainer />
            </>

        </div>
    )
}

export default Recovery
