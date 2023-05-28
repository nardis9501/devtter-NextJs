import Devit from "@/components/Devit"
import React from "react"

export default function DevitPage(props) {
  return (
    <>
      <section>
        <h1>Devit</h1>
        <Devit {...props} />
        <div></div>
      </section>
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          align-items: start;

          width: 100%;
        }

        h1 {
          padding-left: 8px;
          color: #000;
        }
        article:hover {
          background-color: black;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
async function fetchDevit(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/devits/${id}`)

    if (res.ok) {
      const json = await res.json()

      return json
    } else {
      throw new Error("Failed to fetch devit")
    }
  } catch (error) {
    console.error(error)
  }
}

DevitPage.getInitialProps = async (context) => {
  const { query } = context
  const { id } = query

  return await fetchDevit(id)
}
