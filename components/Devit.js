import Avatar from "./Avatar"

export default function Devit({ avatar, userName, createdAt, content, id }) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong>{userName}</strong>

          <span> · </span>

          <span>{createdAt}</span>

          <p>{content}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #ccc;
          display: flex;
          padding: 5px;
          width: 100%;
        }
        section {
        }

        div {
          padding: 1px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }

        span {
          margin: 0 5px;
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
