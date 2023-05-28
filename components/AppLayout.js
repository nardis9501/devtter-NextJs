// import styles from "styles/AppLayout.module.css"
export default function AppLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <style jsx>{`
        main {
          background-color: #e1e2e2;

          margin: 0 auto;
          display: flex;
          flex-direction: column;
          position: relative;
          justify-content: space-between;
          align-items: center;
          max-width: 725px;
          height: 100vh;
          overflow-y: auto;
          box-shadow: 0 0.1rem 0.5rem rgb(0, 0, 0 0.1);
        }

        main:hover {
          box-shadow: 0 0.1rem 0.85rem rgb(0, 0, 0 0.1);
        }

        @media (max-width: 725px) {
          main {
            width: 66%;
            height: 100vh;
          }
        }
      `}</style>
    </>
  )
}
