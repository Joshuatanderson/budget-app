import React, { Fragment, Dispatch, SetStateAction } from "react";

import firebase, { User } from "firebase";
import * as firebaseui from "firebaseui";

interface AuthModel {
	user: User | undefined;
	setUser: Dispatch<SetStateAction<User | undefined>>;
}

const Auth = ({ user, setUser }: AuthModel) => {
	const handleSuccess = function () {
		return true;
	};

	const uiConfig = {
		callbacks: {
			signInSuccessWithAuthResult: function (
				authResult: any,
				redirectUrl: string
			) {
				console.log(authResult);
				setUser(authResult)
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				return false;
			},
			// uiShown: function() {
			//   // The widget is rendered.
			//   // Hide the loader.
			//   document.getElementById('loader').style.display = 'none';
			// }
		},
		// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		signInFlow: "popup",
		signInSuccessUrl: "/tab1",
		signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			// firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			// firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			// firebase.auth.TwitterAuthProvider.PROVIDER_ID,
			// firebase.auth.GithubAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
			// firebase.auth.PhoneAuthProvider.PROVIDER_ID,
		],
		// Terms of service url.
		// tosUrl: "<your-tos-url>",
		// Privacy policy url.
		// privacyPolicyUrl: "<your-privacy-policy-url>",
	};
	const ui = new firebaseui.auth.AuthUI(firebase.auth());
	ui.start("#firebaseui-auth-container", uiConfig);
	return <div id="firebaseui-auth-container"></div>;
};

export default Auth;
