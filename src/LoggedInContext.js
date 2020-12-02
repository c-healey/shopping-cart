import React, { useState } from "react";

export const LoggedInContext = React.createContext();

export const LoggedInProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState([]);
  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      {props.children}
    </LoggedInContext.Provider>
  );
};
