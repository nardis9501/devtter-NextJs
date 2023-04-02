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
          border-bottom: 2px solid #ccc;
          position: fixed;
          align-items: center;
          display: flex;
          height: 49px;
          top: 0;
          margin: 0 auto;
          width: 64%;
        }

        h2 {
          color: black;
          font-size: 21px;
        }

        section {
          //border-top: 2px solid #ccc;
          position: relative;
          align-items: space-between;
          display: grid;
          height: 100%;
          // bottom: 0;
           {
            /* margin: 0 auto; */
          }
          width: 100vh;
          padding: 0 0 0 10px;
        }

        nav {
          border-top: 2px solid #ccc;
          position: fixed;
          align-items: center;
          display: flex;
          height: 49px;
          bottom: 0;
          margin: 0 auto;
          width: 64%;
        }
      `}</style>
    </>
  )
}
