import { useEffect, useState } from "react"
import Button from "../../components/Button"
import useUser from "../hooks/useUser"
import { addDevit, uploadImage } from "../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import { getDownloadURL, ref, getStorage, deleteObject } from "firebase/storage"
import Avatar from "@/components/Avatar"

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
        <main>
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
                  <div className="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
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
        </main>

        <style jsx>{`

        main {
          background-color: #e1e2e2;
         
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          position :relative
          padding: 6rem;
          max-width: 800px;
          width: 66%;
          height: 100vh;
          box-shadow: 0 0.1rem 0.6rem rgb(0, 0, 0.1);
         }

        main:hover {
          box-shadow: 0 0.1rem 0.85rem rgb(0, 0, 0 0.1);
         }

         header {
          margin-top:5px;
          display: flex;
          align-items:flex-start;
         }
         form{
          width: 100%;
          padding : 10px;
         }
        textarea {
          border: ${
            drag === DRAG_IMAGE_STATE.DRAG_OVER
              ? "3px dashed #09f"
              : "3px dashed transparent"
          };
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

        button{
          top: 230px;
          right: 190px;
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

        .lds-spinner {
          
          color: official;
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .lds-spinner div {
          transform-origin: 40px 40px;
          animation: lds-spinner 1.2s linear infinite;
        }
        .lds-spinner div:after {
          content: " ";
          display: block;
          position: absolute;
          top: 3px;
          left: 37px;
          width: 6px;
          height: 18px;
          border-radius: 20%;
          background: #fff;
        }
        .lds-spinner div:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -1.1s;
        }
        .lds-spinner div:nth-child(2) {
          transform: rotate(30deg);
          animation-delay: -1s;
        }
        .lds-spinner div:nth-child(3) {
          transform: rotate(60deg);
          animation-delay: -0.9s;
        }
        .lds-spinner div:nth-child(4) {
          transform: rotate(90deg);
          animation-delay: -0.8s;
        }
        .lds-spinner div:nth-child(5) {
          transform: rotate(120deg);
          animation-delay: -0.7s;
        }
        .lds-spinner div:nth-child(6) {
          transform: rotate(150deg);
          animation-delay: -0.6s;
        }
        .lds-spinner div:nth-child(7) {
          transform: rotate(180deg);
          animation-delay: -0.5s;
        }
        .lds-spinner div:nth-child(8) {
          transform: rotate(210deg);
          animation-delay: -0.4s;
        }
        .lds-spinner div:nth-child(9) {
          transform: rotate(240deg);
          animation-delay: -0.3s;
        }
        .lds-spinner div:nth-child(10) {
          transform: rotate(270deg);
          animation-delay: -0.2s;
        }
        .lds-spinner div:nth-child(11) {
          transform: rotate(300deg);
          animation-delay: -0.1s;
        }
        .lds-spinner div:nth-child(12) {
          transform: rotate(330deg);
          animation-delay: 0s;
        }
        @keyframes lds-spinner {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

      `}</style>
      </>
    )
  )
}
