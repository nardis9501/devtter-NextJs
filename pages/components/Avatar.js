// import styles from "./../../styles/Avatar.module.css"

export default function Avatar({ src, alt, text }) {
  return (
    <>
      <div className={"container"}>
        <img className={"avatar"} src={src} alt={alt} />
        {text && <strong>{text}</strong>}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }

        .avatar {
          border-radius: 9999px;
          height: 49px;
          width: 49px;
          margin-left: 8px;
        }
      `}</style>
    </>
  )
}
