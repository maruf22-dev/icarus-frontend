import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export const AppContext = createContext();
export function AppWrapper({ children }) {

  const [profileID, setProfileID] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [allThreadContext, setAllThreadContext] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [appLevelChange, setAppLevelChange] = useState(false);

  let BACKEND_URL;
  let SQL_DB_INFO;
  BACKEND_URL = 'http://localhost:3001';
  // BACKEND_URL = 'https://icarus-backend.herokuapp.com' 
  SQL_DB_INFO = 'LOCAL';
  // SQL_DB_INFO = 'WEB';
  let refreshed = false;
  let router = useRouter();
  useEffect(() => {
    refreshed = true;
    setProfileID(JSON.parse(localStorage.getItem("profileID")));
    setProfileName(JSON.parse(localStorage.getItem("profileName")));
    setProfilePassword(JSON.parse(localStorage.getItem("profilePassword")));
    setProfileEmail(JSON.parse(localStorage.getItem("profileEmail")));
    setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
  }, []);


  useEffect(() => {
    if (refreshed) return;

    if (loggedIn === false) {
      localStorage.setItem("profileID", JSON.stringify(""));
      localStorage.setItem("profileName", JSON.stringify(""));
      localStorage.setItem("profileEmail", JSON.stringify(""));
      localStorage.setItem("profilePassword", JSON.stringify(""));
      localStorage.setItem("loggedIn", JSON.stringify(false));
    }
    else {
      localStorage.setItem("profileID", JSON.stringify(profileID));
      localStorage.setItem("profileName", JSON.stringify(profileName));
      localStorage.setItem("profileEmail", JSON.stringify(profileEmail));
      localStorage.setItem("profilePassword", JSON.stringify(profilePassword));
      localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    }

  }, [appLevelChange]);

  let updateThreadContextFromBackend = async () => {
    let demo = [
      {
        userID: uuid(),
        threadName: "maruf",
        threadPictureLink: ""
      },
      {
        userID: uuid(),
        threadName: "farhan",
        threadPictureLink: ""

      },
      {
        userID: null,
        threadName: "cse group",
        threadPictureLink: ""
      },
      {
        userID: null,
        threadName: "mat group",
        threadPictureLink: ""
      }
    ]
    setAllThreadContext(demo);
  }
  // curl -d '{"userName" : "user", "userID" : "UID", "email" : "email", "password" : "*****"}' 
  // -H 'Content-Type: application/json' 
  // http://localhost:3001/api/v1/database/createuser?HOST=LOCAL
  // 
  let createAccount = async (userName, email, password) => {
    let userID = uuid();
    let URL = `${BACKEND_URL}/api/v1/database/createuser?HOST=${SQL_DB_INFO}`;
    let notify = '';
    let result = await axios.post(
      URL,
      {
        userName: userName,
        userID: userID,
        email: email,
        password: password
      }
    );
    notify = result.data.data.status ? '' : 'There is already an account registered with this email';
    return {
      status: result.data.data.status,
      notify: notify,
    }
  }

  //  curl -d '{"email" : "email", "password" : "*****"}' 
  // -H 'Content-Type: application/json' 
  // http://localhost:3001/api/v1/database/userauth?HOST=LOCAL


  let authAccount = async (email, password) => {
    let URL = `${BACKEND_URL}/api/v1/database/userauth?HOST=${SQL_DB_INFO}`;
    let notify = '';
    let status = true;
    let result = await axios.post(
      URL,
      {
        email: email,
        password: password
      }
    );
    if (result.data.status_code != 200) {
      status = false;
      if (result.data.error === "EMAIL_NOT_FOUND")
        notify = "There is no account asscosiated with this email";
      else
        notify = "the password doesn't match the server.";
    }
    else {
      setProfileID(result.data.main.userID);
      setProfileEmail(result.data.main.email);
      setProfilePassword(result.data.main.password);
      setProfileName(result.data.main.userName);
      setLoggedIn(true);
      localStorage.setItem("profileID", JSON.stringify(result.data.main.userID));
      localStorage.setItem("profileName", JSON.stringify(result.data.main.userName));
      localStorage.setItem("profileEmail", JSON.stringify(result.data.main.email));
      localStorage.setItem("profilePassword", JSON.stringify(result.data.main.password));
      localStorage.setItem("loggedIn", JSON.stringify(true));
    }
    return {
      status: status,
      notify: notify,
    }
  }

  let sharedState = {
    appLevelChange,
    setAppLevelChange,
    //
    loggedIn,
    setLoggedIn,
    //
    profileID,
    setProfileID,
    //
    profileName,
    setProfileName,
    //
    profileEmail,
    setProfileEmail,
    //
    profilePassword,
    setProfilePassword,
    //
    allThreadContext,
    setAllThreadContext,
    updateThreadContextFromBackend,
    //
    createAccount,
    authAccount
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
