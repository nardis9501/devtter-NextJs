import Avatar from "./Avatar"

export default function Devit({ avatar, username, message, id }) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #ccc;
          display: flex;
          padding: 5px;
          width: 133%;
          
        }
        section {
          display: block;
          
  }
          padding: 1px;
        }
        div {
        }
        p {
          line-height: 1.3125;
           {
            /* margin: 0; */
          }
        }
      `}</style>
    </>
  )
}
