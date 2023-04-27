import { initializeApp } from "firebase/app"
import {
  orderBy,
  query,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore"

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"

import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth"
import { useCallback } from "react"

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

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
export const addDevit = async ({ avatar, userId, img, content, userName }) => {
  try {
    const docRef = await addDoc(collection(db, "devits"), {
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
  } catch (err) {
    console.error("Error adding document: ", err)
  }
}

export const fechtLatestDevits = async () => {
  // const database = getDocs(collection(db, "devits"))
  // console.log(database)

  return (
    getDocs(query(collection(db, "devits"), orderBy("createdAt", "desc")))
      // .orderBy("createdAt")
      .then(({ docs }) => {
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
  )
}

export const storageMemoizedCallback = (file) => {
  const storage = getStorage(app)
  const storageRef = ref(storage, `images/${file.name}`)
  return storageRef
}
export const uploadImage = (file) => {
  // Initialize Cloud Storage and get a reference to the service
  storageMemoizedCallback(file)

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  }
  const task = uploadBytesResumable(
    storageMemoizedCallback(file),
    file,
    metadata
  )
  // const task = storageRef.put(file)
  console.log(task)
  return task
}

export const taskStateChanged = (task) => {
  task.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log("Upload is " + progress + "% done")
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused")
          break
        case "running":
          console.log("Upload is running")
          break
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break
        case "storage/canceled":
          // User canceled the upload
          break

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break
      }
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(task.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL)
      })
    }
  )
}

// export const getStorageImgURL = (file) => {
//   // const storage = getStorage()

//   getDownloadURL(storageMemoizedCallback(file))
//     .then((url) => {
//       // `url` is the download URL for 'images/stars.jpg'

//       console.log(url)
//       return url
//     })
//     .catch((error) => {
//       // Handle any errors
//       console.log(error)
//     })
// }

// Create a reference to the file to delete
export const deleteStorageImg = (file) => {
  const desertRef = storageMemoizedCallback(file)
  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      console.log("File deleted successfully")
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error)
    })
}

export default loginWithGithub
