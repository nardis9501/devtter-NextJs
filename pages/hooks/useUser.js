import { useEffect, useState } from "react"
import { onAuthStateChangedToUser } from "../firebase/client"
import { useRouter } from "next/router"

export default function useUser() {
  const [user, setUser] = useState(undefined)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChangedToUser((user) => {
      setUser(user)
    })
  }, [])

  useEffect(() => {
    if (user === null) {
      router.push("/")
    }
  }, [user])

  return user
}
