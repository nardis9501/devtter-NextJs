import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_7I3J5yvdk9Xilae3I9AVOV9s-pG8Fkg",
  authDomain: "devtter-f1bf5.firebaseapp.com",
  projectId: "devtter-f1bf5",
  storageBucket: "devtter-f1bf5.appspot.com",
  messagingSenderId: "20874292799",
  appId: "1:20874292799:web:6e1413341cb614f7ba128a",
  measurementId: "G-Z5WN7D70CC",
}

// Initialize Firebase V9
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

// Handle user state changed
export const onAuthStateChangedToUser = (onChance) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const mapUser = () => {
        // const {user} = auth.currentUser;

        const { photoURL, providerData, email, uid, accessToken } = user
        const { displayName } = providerData[0]
        // const uid = user.uid

        // console.log(user)
        return {
          userName: displayName,
          email,
          avatar: photoURL,
          userID: uid,
          token: accessToken,
        }
      }

      // ...
      onChance(mapUser)
    } else {
      // User is signed out
      // ...
      onChance(user)
    }
  })
}

// Crea una instancia del objeto del proveedor de GitHub:
const provider = new GithubAuthProvider()
const loginWithGithub = () => {
  return signInWithPopup(auth, provider).then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential.accessToken

    // The signed-in user info.
    const { user } = result
    // console.log(user);
    const { photoURL, providerData, email } = user
    const { displayName } = providerData[0]

    return {
      userName: displayName,
      email,
      avatar: photoURL,
      token,
    }
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
}

export default loginWithGithub
