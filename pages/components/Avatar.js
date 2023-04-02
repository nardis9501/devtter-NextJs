import styles from "./../../styles/Avatar.module.css"

export default function Avatar({ src, alt, text }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={src} alt={alt} />
      {text && <strong>{text}</strong>}
    </div>
  )
}
