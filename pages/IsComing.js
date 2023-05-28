import React from "react"
import CoffieSvgIcon from "../components/Icons/CoffieSvgIcon"
export default function IsComing(props) {
  return (
    <>
      <h1>
        We are working on it, it will arrive soon. Wait for next updates. Enjoy
        your Devitis. Detter&apos;s team
      </h1>

      <div>
        <CoffieSvgIcon width={100} height={100} />
      </div>

      <style jsx>{`
        h1 {
          font-size: 25px;
          color: #00000099;
          margin: 0 auto;
          width: 90%;
        }
      `}</style>
    </>
  )
}
