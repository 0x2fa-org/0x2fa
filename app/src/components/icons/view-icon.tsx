import { FC } from "react"

const ViewIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.1303 5.6988C21.2899 6.91887 21.2899 8.77253 20.1303 9.9926C18.1745 12.0504 14.8155 14.8457 11 14.8457C7.18448 14.8457 3.82549 12.0504 1.86971 9.9926C0.710098 8.77253 0.710098 6.91887 1.86971 5.6988C3.82549 3.64104 7.18448 0.845703 11 0.845703C14.8155 0.845703 18.1745 3.64104 20.1303 5.6988Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14 7.8457C14 9.50256 12.6569 10.8457 11 10.8457C9.34315 10.8457 8 9.50256 8 7.8457C8 6.18885 9.34315 4.8457 11 4.8457C12.6569 4.8457 14 6.18885 14 7.8457Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default ViewIcon
