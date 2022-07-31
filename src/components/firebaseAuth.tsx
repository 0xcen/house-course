import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: "/",
};

const FirebaseAuth: React.FC = () => {
  const [renderAuth, setRenderAuth] = useState(false);

  // trick to make component only render in browser.
  // UseEffect only works in browser
  useEffect(() => {
    setRenderAuth(true);
  }, []);

  return (
    <div className="mt-16">
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  );
};

export default FirebaseAuth;
