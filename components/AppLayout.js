// import styles from "styles/AppLayout.module.css"
export default function AppLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <style jsx>{`
        main {
          background-color: #e1e2e2;
          border: solid 1px #ccc;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          position: relative;
          justify-content: space-between;
          align-items: center;
          padding: 6rem;
          max-width: 725px;
          height: 100vh;
          overflow-y: auto;
        }

        @media (max-width: 725px) {
          main {
            height: 100vh;
            width: 66%;
            padding: 6rem;
          }
        }
      `}</style>
    </>
  )
}
