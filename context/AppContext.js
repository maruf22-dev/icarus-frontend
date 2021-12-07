import { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid'

export const AppContext = createContext();

export function AppWrapper({ children }) {

  const [profileName, setProfileName] = useState("user");
  const [profileID, setProfileID] = useState(uuid());
  const [allThreadContext, setAllThreadContext] = useState([]);

  let updateThreadContextFromBackend = async ()=>
  {
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

  let sharedState = {
      profileName,
      setProfileName,
      profileID,
      setProfileID,
      allThreadContext,
      setAllThreadContext,
      updateThreadContextFromBackend
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
