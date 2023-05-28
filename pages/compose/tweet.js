import { useEffect, useState } from "react"
import Button from "../../components/Button"
import useUser from "../hooks/useUser"
import { addDevit, uploadImage } from "../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import { getDownloadURL, ref, getStorage, deleteObject } from "firebase/storage"
import Avatar from "@/components/Avatar"
import Spinner from "@/components/Spinner"

const COMPOSE_STATES = {
  USER_NOT_NOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_NOW)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const [file, setFile] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = (snapshot) => {
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
      }

      const onError = (error) => {
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
      }

      const onComplete = () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL)
          setImgURL(downloadURL)
        })
      }

      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  // e = event
  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.userId,
      userName: user.userName,
      img: imgURL,
    }).then(() => {
      router.push("/home")
      setStatus(COMPOSE_STATES.SUCCESS)
    })
  }

  const handleDragEnter = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
    console.log("imagen dentro ", event.dataTransfer.files[0])
  }

  const handleDragLeave = (event) => {
    setDrag(DRAG_IMAGE_STATE.NONE)
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    console.log("imagen fuera")
    console.log(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
    const file = event.dataTransfer.files[0]
    console.log(file)
    console.log(file.name)
    const task = uploadImage(file)
    console.log(task)
    setTask(task)
    setFile(file)
    setImgURL(DRAG_IMAGE_STATE.UPLOADING)
  }

  const deleteStorageImg = () => {
    setImgURL(null)
    const storage = getStorage()
    const storageRef = ref(storage, `images/${file.name}`)

    // Delete the file
    deleteObject(storageRef)
      .then(() => {
        console.log("File deleted successfully")
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
      })
  }

  // const handleDragOver = (e) => {
  //   e.preventDefault()

  //   return false
  // }

  const isDisabledButton =
    !message.trimStart().length || status === COMPOSE_STATES.LOADING

  return (
    user && (
      <>
        <Head>
          <title>Create a Devit</title>
        </Head>
        <header>
          {user && <Avatar src={user.avatar} />}
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              // onDragOver={handleDragOver}
              placeholder="¿Qué está pasando?"
              value={message}
            ></textarea>
            {imgURL === DRAG_IMAGE_STATE.UPLOADING && (
              <section>
                <Spinner />
              </section>
            )}

            {imgURL && imgURL !== DRAG_IMAGE_STATE.UPLOADING && (
              <section>
                <figure>
                  <img src={imgURL} />
                </figure>
                <button
                  onClick={() => {
                    deleteStorageImg(file)
                  }}
                >
                  X
                </button>
              </section>
            )}
            <div className="button-conteiner">
              <Button disabled={isDisabledButton}>Devittear</Button>
            </div>
          </form>
        </header>

        <style jsx>{`
          header {
            margin-top: 5px;
            display: flex;
            flex-direction: column;
            position: relative;
            padding: 2px 1rem 0 1px;
            width: 100%;
            align-items: flex-start;
          }

          header1 {
          }
          form {
            width: 100%;
            padding: 10px;
          }
          textarea {
            border: ${drag === DRAG_IMAGE_STATE.DRAG_OVER
              ? "3px dashed #09f"
              : "3px dashed transparent"};
            font-size: 21px;
            width: 100%;
            outline: 0;
            resize: none;
            background-color: #e1e2e2;
            min-height: 200px;
          }

          section {
            display: flex;
          }

          figure {
            width: 100%;
            max-height: 500px;
            overflow-y: auto;

            border-radius: 15px;
          }

          img {
            width: 100%;
            max-height: auto;
            overflow-y: auto;
            border-radius: 15px;
          }

          button {
            top: 280px;
            right: 40px;
            width: 32px;
            height: 32px;
            border-radius: 999px;
            background-color: rgb(0 0 0 /0.3);
            position: absolute;
            color: #fff;
            font-size: 20px;
          }

          .button-conteiner {
            padding: 15px;
          }
        `}</style>
      </>
    )
  )
}
