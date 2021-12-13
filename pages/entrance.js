import Head from 'next/head'
import Image from 'next/image'
import router, { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AppContext, useAppContext } from '../context/AppContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/entrance.module.css'
import loginStyles from '../styles/login.module.css'
import signupStyles from '../styles/signup.module.css'


const notify = (message) => toast.dark(
    message,
    {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
    }
);




export default function Entrance() {

    let router = useRouter();
    useEffect(() => {
        window.addEventListener('storage', () => {
            const verified = localStorage.getItem('loggedIn');
            if (JSON.parse(verified) === true) router.push("/dashboard");
        })
    }, [])

    const [wrongLoginCredintial, setWrongLoginCredintial] = useState(false);
    const [showLoginComponent, setShowLoginComponent] = useState(true);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    return (
        <div className={styles.entrance_page}>
            <div className={styles.absolute_title_container}>Domus</div>
            {
                showLoginComponent ?
                    (
                        <Login
                            loginEmail={loginEmail} setLoginEmail={setLoginEmail}
                            loginPassword={loginPassword}
                            setLoginPassword={setLoginPassword} wrongLoginCredintial={wrongLoginCredintial}
                            setWrongLoginCredintial={setWrongLoginCredintial}
                            setShowLoginComponent={setShowLoginComponent}
                        ></Login>
                    )
                    :
                    (
                        <SignUp
                            signupUsername={signupUsername}
                            signupEmail={signupEmail}
                            signupPassword={signupPassword}
                            setSignupUsername={setSignupUsername}
                            setSignupEmail={setSignupEmail}
                            setSignupPassword={setSignupPassword}
                            setShowLoginComponent={setShowLoginComponent}
                        >
                        </SignUp>
                    )
            }

        </div>
    )
}

function Login({
    loginEmail, setLoginEmail,
    loginPassword,
    setLoginPassword, wrongLoginCredintial,
    setWrongLoginCredintial,
    setShowLoginComponent
}) {

    const { authAccount } = useAppContext();

    const Router = useRouter();


    async function verifyAndLogin() {
        let result = await authAccount(loginEmail, loginPassword);
        if (result.status === true) {
            setWrongLoginCredintial(false);
            Router.push("/dashboard");
            return;
        }
        setWrongLoginCredintial(true);
        notify(result.notify);
    }

    return (
        <>
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
                        <p>{""}</p>
                    </div>
                    <div className={loginStyles.login_email_text_container}>
                        <p>{""}</p>
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
                        <p>{""}</p>
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
            <ToastContainer></ToastContainer>
        </>


    )
}

function SignUp({
    signupUsername,
    setSignupUsername,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    setShowLoginComponent
}) {


    let { createAccount } = useAppContext();
    const Router = useRouter();
    return (
        <>

            <div className={signupStyles.signup_container}>
                <div className={signupStyles.signup_left}>
                    <div className={signupStyles.signup_app_title_container}>
                        <p>{"Create Account"}</p>
                    </div>

                </div>
                <div className={signupStyles.signup_right}>

                    <div className={signupStyles.mobile_app_title_container}>
                        <div className={signupStyles.center_it}>
                            <p>{"Domus"}</p>
                        </div>
                    </div>
                    <div className={signupStyles.signup_title_container}>
                        <p>{""}</p>
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
                        <p>{""}</p>
                    </div>

                    <div className={signupStyles.signup_button_container}>
                        <div className={signupStyles.signup_button}
                            onClick={async () => {
                                let result = await createAccount(signupUsername, signupEmail, signupPassword);
                                if (result.status === false)
                                    notify(result.notify);
                                else {
                                    setSignupEmail("");
                                    setSignupPassword("");
                                    setSignupUsername("");
                                    setShowLoginComponent(true);
                                }
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
            <ToastContainer></ToastContainer>
        </>
    )

}