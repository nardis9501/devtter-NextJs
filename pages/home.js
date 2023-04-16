import AppLayout from "../components/AppLayout"
import Devit from "../components/Devit"
import { useEffect, useState } from "react"
import useUser from "./hooks/useUser"
import { fechtLatestDevits } from "./firebase/client"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  const user = useUser()

  useEffect(() => {
    user && fechtLatestDevits().then(setTimeline)
  }, [user])
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>

        <section>
          {timeline.map(({ id, userName, createdAt, avatar, content }) => (
            <Devit
              avatar={avatar}
              id={id}
              key={id}
              content={content}
              userName={userName}
              createdAt={createdAt}
            />
          ))}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          border-bottom: 1px solid #ccc;
          background-color: #e3e3e3aa;
          backdrop-filter: blur(5px);
          position: fixed;
          align-items: center;
          display: flex;
          height: 49px;
          top: 0;
          width: 725px;
        }
        h2 {
          color: black;
          font-size: 21px;
        }

        section {
          width: 100%;
           {
            /* padding: 49px 0 49px 0; */
          }
        }

        nav {
          border-top: 1px solid #ccc;
          background-color: #e3e3e3aa;
          backdrop-filter: blur(5px);
          position: fixed;
          align-items: center;
          display: flex;
          height: 49px;
          bottom: 0;
          margin: 0 auto;
          width: 725px;
        }
        @media (max-width: 725px) {
          header {
            width: 66%;
          }
          nav {
            width: 66%;
          }
        }
      `}</style>
    </>
  )
}
