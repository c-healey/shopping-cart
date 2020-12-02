import React, { useContext } from "react";
import { useGoogleLogout } from "react-google-login";

import { LoggedInContext } from "./LoggedInContext";

const clientId =
  //   "707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com";
  "1036837016251-dvqb16dmo47obs19s1cpoo2kai7qg04t.apps.googleusercontent.com";

function LogoutHooks() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const onLogoutSuccess = (res) => {
    console.log("Logged out Success");
    // alert("Logged out Successfully ✌");
    setLoggedIn([false].splice());
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default LogoutHooks;
