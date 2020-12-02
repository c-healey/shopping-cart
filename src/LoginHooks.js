import React, { useContext } from "react";
import { useGoogleLogin } from "react-google-login";

// refresh token
import { refreshTokenSetup } from "./utils/refreshToken";
import { LoggedInContext } from "./LoggedInContext";

const clientId =
  //   '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';
  "1036837016251-dvqb16dmo47obs19s1cpoo2kai7qg04t.apps.googleusercontent.com";

function LoginHooks() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    // alert(`Logged in successfully welcome ${res.profileObj.name} 😍. \n `);
    refreshTokenSetup(res);
    // console.log("LoggedIn", loggedIn);
    setLoggedIn([res.profileObj].splice());
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    // alert(`Failed to login. 😢 `);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign in</span>
    </button>
  );
}

export default LoginHooks;
