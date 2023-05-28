import Devit from "../components/Devit"
import { useEffect, useState } from "react"
import useUser from "./hooks/useUser"
import { fechtLatestDevits } from "../firebase/client"
import Link from "next/link"
import Create from "@/components/Icons/CreateSvgIcon"
import HomeIcon from "@/components/Icons/HomeSvgIcon"
import Search from "@/components/Icons/SearchSvgIcon"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  const user = useUser()

  useEffect(() => {
    user && fechtLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Home - Devits</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>

      <section>
        {timeline.map(({ id, userName, img, createdAt, avatar, content }) => (
          <Devit
            avatar={avatar}
            id={id}
            key={id}
            img={img}
            content={content}
            userName={userName}
            createdAt={createdAt}
          />
        ))}
      </section>
      <nav>
        <Link href={"#"} passHref legacyBehavior>
          <a>
            <HomeIcon stroke="#09f" />
          </a>
        </Link>
        <Link href={"#"} passHref legacyBehavior>
          <a>
            <Search stroke="#09f" />
          </a>
        </Link>
        <Link href={"/compose/tweet"} passHref legacyBehavior>
          <a>
            <Create stroke="#09f" />
          </a>
        </Link>
      </nav>

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
          display: grid;
          place-content: start;
          place-items: center;
          width: 100%;
          padding: 3rem 2rem 3rem 1rem;
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

        nav a {
          height: 100%;
          display: flex;
          align-items: center;
          align-content: space-between;
          justify-content: center;
          flex: 1 1 auto;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: #0049ff;
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
