import useTimeago from "@/pages/hooks/useTimeAgo"
import Avatar from "./Avatar"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Devit({
  avatar,
  userName,
  img,
  createdAt,
  content,
  id,
}) {
  const { timeAgo, titleTime } = useTimeago(createdAt)
  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }
  const handleClickIsComing = (e) => {
    // e.preventDefault()
    router.push("/IsComing")
  }
  return (
    <>
      <article onClick={handleClick}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong onClick={handleClickIsComing}>{userName}</strong>

          <span> · </span>

          <Link className="link" href={`/status/${id}`}>
            <time title={titleTime}>{timeAgo}</time>
          </Link>

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

        article:hover {
          background-color: #f5f8fa88;
          cursor: pointer;
        }

        section {
          display: block;
          flex: 1;
        }

        div {
          padding: 1px;
        }

        strong:hover {
          text-decoration: underline;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }

        span {
          margin: 0 5px;
        }
        img {
          width: 90%;

          height: auto;
          border-radius: 15px;
          margin-top: 10px;
        }
        time {
          color: #555;
          font-size: 14px;
        }

        time:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
