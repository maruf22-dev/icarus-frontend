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
        groupID: null,
        threadName: "maruf",
        threadPictureLink: ""
      },
      {
        userID: uuid(),
        groupID: null,
        threadName: "farhan",
        threadPictureLink: ""
        
      },
      {
        userID: null,
        groupID: uuid(),
        threadName: "cse group",
        threadPictureLink: ""
      },
      {
        userID: null,
        groupID: uuid(),
        threadName: "mat group",
        threadPictureLink: ""
      }
    ]
    // demo = [...demo, ...demo, ...demo, ...demo, ...demo, ...demo, ...demo, ...demo];
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
