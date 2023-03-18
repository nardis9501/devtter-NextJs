import styles from "./../../styles/AppLayout.module.css"
export default function AppLayout({ children }) {
   return (
    <>
    <main className={styles.main}>
        {children}
    </main>
    </>
   ) 
}