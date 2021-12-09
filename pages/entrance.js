import Head from 'next/head'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/entrance.module.css'
import loginStyles from '../styles/login.module.css'
import signupStyles from '../styles/signup.module.css'

export default function Entrance() {

    const Router = useRouter();
    const [wrongLoginCredintial, setWrongLoginCredintial] = useState(false);
    const [showLoginComponent, setShowLoginComponent] = useState(true);


    function Login() {
        const [loginEmail, setLoginEmail] = useState("");
        const [loginPassword, setLoginPassword] = useState("");

        async function verifyLoginCredintial() {
            console.log(loginEmail);
            console.log(loginPassword);
            let adminVerification = "admin"
            return (loginEmail === adminVerification && loginPassword === adminVerification);
        }

        async function verifyAndLogin() {
            let verificationStatus = await verifyLoginCredintial();
            if (verificationStatus === true) {
                setWrongLoginCredintial(false);
                Router.push("dashboard");
                return;
            }
            setWrongLoginCredintial(true);
        }

        return (
            <div className={loginStyles.login_container}>
                <div className={loginStyles.login_left}>
                    <div className={loginStyles.login_app_title_container}>
                        <p>
                            {"Login Credentials"}
                        </p>
                    </div>
                </div>
                <div className={loginStyles.login_right}>
                    <div className={loginStyles.mobile_app_title_container}>
                        <div className={loginStyles.center_it}>
                            <p>{"Domus"}</p>
                        </div>
                    </div>
                    <div className={loginStyles.login_title_container}>
                        <p>
                            {""}
                        </p>
                    </div>
                    <div className={loginStyles.login_email_text_container}>
                        <p>
                            {
                                ""
                            }
                        </p>
                    </div>
                    <div className={loginStyles.login_email_input_container}>
                        <input
                            type="text"
                            placeholder="Email"
                            spellCheck="false"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className={loginStyles.login_password_text_container}>
                        <p>
                            {
                                ""
                            }
                        </p>
                    </div>
                    <div className={loginStyles.login_password_input_container}>
                        <input type="password"
                            placeholder="Password" spellCheck="false"
                            autoComplete="new-password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                    <div className={loginStyles.login_warning_container}>
                        <p>
                            {wrongLoginCredintial ? "Wrong Password or Email" : ""}
                        </p>
                    </div>

                    <div className={loginStyles.login_button_container}>
                        <div className={loginStyles.login_button} onClick={verifyAndLogin}>Login</div>
                    </div>
                    <div className={loginStyles.login_to_signup_link_container}>
                        <p>{"Don't have an account? "}</p>
                        <p className={loginStyles.register_link} onClick={() => { setShowLoginComponent(false) }}>Register</p>
                    </div>
                    <div className={styles.center_content}>
                        <p className={loginStyles.recovery_link} onClick={() => { Router.push("/recovery") }} >Forgot Password?</p>
                    </div>
                </div>
            </div>

        )
    }

    function SignUp() {
        const [signupUsername, setSignupUsername] = useState("");
        const [signupEmail, setSignupEmail] = useState("");
        const [signupPassword, setSignupPassword] = useState("");


        return (
            <>

                <div className={signupStyles.signup_container}>
                    <div className={signupStyles.signup_left}>
                        <div className={signupStyles.signup_app_title_container}>
                            <p>Create Account</p>
                        </div>

                    </div>
                    <div className={signupStyles.signup_right}>

                        <div className={signupStyles.mobile_app_title_container}>
                            <div className={signupStyles.center_it}>
                                <p>{"Domus"}</p>
                            </div>
                        </div>
                        <div className={signupStyles.signup_title_container}>
                            <p>
                                {""}
                            </p>
                        </div>

                        <div className={signupStyles.signup_email_username_input_container}>
                            <input
                                type="text"
                                placeholder="Username"
                                spellCheck="false"
                                value={signupUsername}
                                onChange={(e) => setSignupUsername(e.target.value)}
                            />
                        </div>
                        <div className={signupStyles.signup_email_username_text_container}>
                            <p>{""}</p>
                        </div>
                        <div className={signupStyles.signup_email_username_input_container}>
                            <input
                                type="text"
                                placeholder="Email"
                                spellCheck="false"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                            />
                        </div>
                        <div className={signupStyles.signup_password_text_container}>
                            <p>{""}</p>
                        </div>
                        <div className={signupStyles.signup_password_input_container}>
                            <input type="password"
                                placeholder="Password" spellCheck="false"
                                autoComplete="new-password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                            />
                        </div>


                        <div className={signupStyles.signup_warning_container}>
                            <p>
                            </p>
                        </div>

                        <div className={signupStyles.signup_button_container}>
                            <div className={signupStyles.signup_button}
                                onClick={() => {
                                    setSignupEmail("");
                                    setSignupPassword("");
                                    setSignupUsername("");

                                }}>{"Signup"}</div>
                        </div>
                        <div className={signupStyles.signup_to_signup_link_container}>
                            <p>{"Already have an account? "}</p>
                            <p className={signupStyles.register_link} onClick={() => { setShowLoginComponent(true) }}>Log In</p>
                        </div>
                        <div className={styles.center_content}>
                            <p className={signupStyles.recovery_link} onClick={() => { Router.push("/recovery") }} >Forgot Password?</p>
                        </div>
                    </div>
                </div>
            </>
        )

    }


    return (
        <div className={styles.entrance_page}>
            <div className={styles.absolute_title_container}>Domus</div>
            {
                showLoginComponent ?
                    (
                        <Login></Login>

                    )
                    :
                    (
                        <SignUp></SignUp>
                    )
            }

        </div>
    )
}
