import { useState } from "react"
import Button from "../../components/Button"
import useUser from "../hooks/useUser"
import { addDevit } from "../../firebase/client"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_NOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_NOW)
  const user = useUser()
  const router = useRouter()

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
    }).then(() => {
      router.push("/home")
      setStatus(COMPOSE_STATES.SUCCESS)
    })
  }

  const isDisabledButton =
    !message.trimStart().length || status === COMPOSE_STATES.LOADING

  return (
    user && (
      <>
        <main>
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              placeholder="¿Qué está pasando?"
              value={message}
            ></textarea>
            <div>
              <Button disabled={isDisabledButton}>Devittear</Button>
            </div>
          </form>
        </main>

        <style jsx>{`
        main {
          background-color: #e1e2e2;
          border: solid 1px #ccc;
          margin: 0 auto;
          //display: flex;
          flex-direction: column;
            position :relative
          padding: 6rem;
          max-width: 800px;
          width: 66%;
          height: 100vh;
         }

        textarea {
          border: 0;
          font-size: 21px;
          width: 100%;
          outline: 0;
          resize: none;
          background-color: #e1e2e2;
          min-height: 200px;
        }

        div{
            padding: 15px;
        }
      `}</style>
      </>
    )
  )
}
