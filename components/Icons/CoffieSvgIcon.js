import * as React from "react"
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 8.5h6a2 2 0 0 1 2 2V13a4.5 4.5 0 0 1-4.5 4.5H9A4.5 4.5 0 0 1 4.5 13v-2.5a2 2 0 0 1 2-2zm8 2h1a2 2 0 1 1 0 4h-1M8.5 6.5v-4M10.5 6.5v-2" />
    </g>
  </svg>
)
export default SvgComponent
