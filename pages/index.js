import Head from "next/head"
import Image from "next/image"
// import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import AppLayout from "./components/AppLayout"
import Button from "./components/Button"
import GitHubIcon from "./components/Icons/GitHubIcon"
import loginWithGitHub from "./firebase/client"
import { GithubAuthProvider } from "firebase/auth"
import { useEffect } from "react"
import Logo from "./components/Icons/Logo"
import { useRouter } from "next/router"
import useUser from "./hooks/useUser"

/* exported inter */
// const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error)
      // ...
      return { errorCode, errorMessage, email, credential }
    })
  }

  return (
    <>
      <Head>
        <title>Devtter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <Logo width="100px" alt="Logo" />

          <h1>Devtter</h1>

          <h2>
            Talk about development <br />
            with developers 👦👧
          </h2>
        </section>

        {user === null && (
          <Button onClick={handleClick}>
            <GitHubIcon fill="#fff" width={24} height={24} />
            Login with GitHub
          </Button>
        )}

        {user === undefined && <img src="/spinner.gif" />}

        {/* This is a description and the footer */}
        <div className={styles.description}>
          <p>
            👦👧 Talk about development with &nbsp;
            <code className={styles.code}>developers</code>
          </p>
          <div>
            <a
              href="https://github.com/nardis9501"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/naryuri_icon.jpg"
                alt="NarYuri Logo"
                className={styles.vercelLogo}
                width={100}
                height={90}
                priority
              />
            </a>
          </div>
        </div>
      </AppLayout>
      <main className={styles.main}> </main>
    </>
  )
}
