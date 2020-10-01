import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
// import { OAuth2Client } from "google-auth-library";
// import { gapi } from "gapi"; // Attempted to try and find packaged Google OAuth libraries rather than including the "gapi" script link in the index.html file in the public directory

const GoogleAuth = ({ isLoggedIn, signIn, signOut }) => {
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  });

  const onAuthChange = (isLoggedIn) => {
    const auth = window.gapi.auth2.getAuthInstance();
    if (isLoggedIn) {
      signIn(auth.currentUser.get().getId());
    } else {
      signOut();
    }
  };

  const onSignInClick = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn();
  };
  const onSignOutClick = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signOut();
  };

  const renderAuthButton = () => {
    if (isLoggedIn === null) {
      return null;
    } else if (isLoggedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui green google button">
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  };

  return (
    <div>
      <div>{renderAuthButton()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
