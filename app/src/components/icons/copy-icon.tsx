import { FC } from "react"

const CopyIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.5 8.31494V6.31494C8.5 4.1058 10.2909 2.31494 12.5 2.31494L18.5 2.31494C20.7091 2.31494 22.5 4.1058 22.5 6.31494V12.3149C22.5 14.5241 20.7091 16.3149 18.5 16.3149H16.5M8.5 8.31494H6.5C4.29086 8.31494 2.5 10.1058 2.5 12.3149V18.3149C2.5 20.5241 4.29086 22.3149 6.5 22.3149H12.5C14.7091 22.3149 16.5 20.5241 16.5 18.3149V16.3149M8.5 8.31494H12.5C14.7091 8.31494 16.5 10.1058 16.5 12.3149V16.3149"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default CopyIcon
