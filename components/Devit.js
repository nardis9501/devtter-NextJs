import useTimeago from "@/pages/hooks/useTimeAgo"
import Avatar from "./Avatar"

export default function Devit({
  avatar,
  userName,
  img,
  createdAt,
  content,
  id,
}) {
  const { timeAgo, titleTime } = useTimeago(createdAt)
  console.log(timeAgo, titleTime)
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong>{userName}</strong>

          <span> · </span>

          <time title={titleTime}>{timeAgo}</time>

          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #ccc;
          display: flex;

          padding: 15px 0 15px 0;
          width: 100%;
        }
        section {
          display: block;
          flex: 1;
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
        img {
          width: 100%;
          height: auto;
          border-radius: 15px;
          margin-top: 10px;
        }
        time {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
