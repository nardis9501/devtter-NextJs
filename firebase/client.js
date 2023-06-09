import { initializeApp } from "firebase/app"
import {
  orderBy,
  query,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  limit,
} from "firebase/firestore"

import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

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
export const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth()

// Handle user state changed
export const onAuthStateChangedToUser = (onChance) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const mapUser = () => {
        // const { accessToken } = auth.currentUser

        const { photoURL, providerData, email, uid, accessToken } = user
        const { displayName } = providerData[0]

        return {
          userName: displayName,
          email,
          avatar: photoURL,
          userId: uid,
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
  return signInWithPopup(auth, provider)
}

// Save tweet (devit) in firebase
export const addDevit = ({ avatar, userId, img, content, userName }) => {
  try {
    const docRef = addDoc(collection(db, "devits"), {
      avatar,
      content,
      userId,
      userName,
      img,
      createdAt: new Date(),
      likesCount: 0,
      sharedCount: 0,
    })
    console.log("Document written with ID: ", docRef.id)
    return docRef
  } catch (err) {
    console.error("Error adding document: ", err)
  }
}

export const fechtLatestDevits = () => {
  return getDocs(
    query(collection(db, "devits"), orderBy("createdAt", "desc"), limit(20))
  ).then(({ docs }) => {
    return docs.map((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      return {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
    })
  })
}

export const uploadImage = (file) => {
  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app)
  const storageRef = ref(storage, `images/${file.name}`)

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  }
  const task = uploadBytesResumable(storageRef, file, metadata)
  // const task = storageRef.put(file)
  console.log(task)
  return task
}

export default loginWithGithub
