import * as React from "react"
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      //   stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={8.5} cy={8.5} r={5} />
      <path d="M17.571 17.5 12 12" />
    </g>
  </svg>
)
export default SvgComponent
