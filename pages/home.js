import AppLayout from "./components/AppLayout"
import Devit from "./components/Devit"
// import styles from "../styles/HomePage.module.css"
import { useEffect, useState } from "react"
// import Avatar from "./components/Avatar"
export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home-timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>

          {/* <div>
            <Avatar
              src={user.avatar}
              alt={"GitHub user avatar"}
              text={user.userName}
            />
          </div> */}
        </header>
        <section>
          {timeline.map(({ id, username, avatar, message }) => (
            <Devit
              avatar={avatar}
              id={id}
              key={id}
              message={message}
              username={username}
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
