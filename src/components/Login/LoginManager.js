// import * as firebase from "firebase/app";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from "./firebase.config";


// initialize firebase
export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app(); // if already initialized, use that one
      }
}

  
  // google auth sign in provuder
  export const handleGoogleSignIn = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const userInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true,
          errorMsg: ''
        };

        return userInfo;
      })
      .catch((error) => {
          const userInfo = {};
          userInfo.success = false;
          userInfo.errorMsg = error.message;
        return userInfo;
      });
  };


  // login with facebook
  export const handleFbLogin = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;

        const userResult = result.user;

        const userInfo = {
          isSignedIn: true,
          name: userResult.displayName,
          email: userResult.email,
          photo: userResult.photoURL,
          success: true,
          errorMsg: ''
        };
        return userInfo;
      })
      .catch((error) => {
        const userInfo = {};
        userInfo.success = false;
        userInfo.errorMsg = error.message;
        return userInfo;
      });
  }

//   manual 
// update user name
const updateUserName = (name) => {
    const authUser = firebase.auth().currentUser;

    authUser
      .updateProfile({
        displayName: name,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  export const crateNewUserWithEmailAndPassword = (name, email, password) => {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const newUserInfo = userCredential.user;
      newUserInfo.success = true;
      newUserInfo.errorMsg = "";
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.errorMsg = error.message;
      newUserInfo.success = false;
        return newUserInfo;
    });
  };

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
    //   const userResult = userCredential.user;

      const newUserInfo = userCredential.user;
      newUserInfo.success = true;
      newUserInfo.errorMsg = "";
        return newUserInfo;
    })
    .catch((error) => {
       const newUserInfo = {};
       newUserInfo.success = false;
       newUserInfo.errorMsg = error.message;
        return newUserInfo;
    });
  }

//   handle sign out
export const handleSignedOut = () => {
    return firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        return signedOutUser;
      })
      .catch((error) => {
        console.log(error);
      });
  };