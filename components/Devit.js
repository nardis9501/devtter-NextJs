import useTimeago from "@/pages/hooks/useTimeAgo"
import Avatar from "./Avatar"

export default function Devit({ avatar, userName, createdAt, content, id }) {
  const timeago = useTimeago(createdAt)
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong>{userName}</strong>

          <span> · </span>

          <time>{timeago}</time>

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
        }

        time {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
