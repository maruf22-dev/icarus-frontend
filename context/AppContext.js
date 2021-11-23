import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppWrapper({ children }) {

  const [profileName, setProfileName] = useState("Md. Maruf Bin Salim");

  let sharedState = {
      profileName,
      setProfileName,
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
