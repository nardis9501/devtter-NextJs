import { useEffect, useState } from "react"
import Button from "../../components/Button"
import useUser from "../hooks/useUser"
import {
  addDevit,
  deleteStorageImg,
  getStorageImgURL,
  storageMemoizedCallback,
  taskStateChanged,
  uploadImage,
} from "../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  getStorage,
} from "firebase/storage"
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
      taskStateChanged(task)
      getDownloadURL(storageMemoizedCallback(file))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'

          console.log(url)
          setImgURL(url)
        })
        .catch((error) => {
          // Handle any errors
          console.log(error)
        })
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
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }

  const handleDrag = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
    const file = event.dataTransfer.files[0]
    console.log(file)
    console.log(file.name)
    const task = uploadImage(file)
    setTask(task)
    setFile(file)
  }

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
                onDrop={handleDrag}
                placeholder="¿Qué está pasando?"
                value={message}
              ></textarea>
              {imgURL && (
                <section>
                  <button
                    onClick={() => {
                      setImgURL(null)
                      deleteStorageImg(file)
                    }}
                  >
                    X
                  </button>
                  <img src={imgURL} />
                </section>
              )}
              <div>
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

        img {
          max-height: 500px;
          width: 100%;
          border-radius: 15px;
        }

        button{
          {/* top: 250px;
          right: 250px;  */}
          width: 32px;
          height: 32px;
          border-radius: 999px;
          background-color: rgb(0 0 0 /0.3);
          position: absolute;
          color: #fff;
          font-size: 20px;

        }

        div{
            padding: 15px;
        }
      `}</style>
      </>
    )
  )
}
