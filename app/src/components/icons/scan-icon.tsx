import { FC } from "react"

const ScanIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.99994 8.6936V7.6936C4.99994 6.58903 5.89537 5.6936 6.99994 5.6936H16.9999C18.1045 5.6936 18.9999 6.58903 18.9999 7.6936V8.6936"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.9999 16.6936L18.9999 17.6936C18.9999 18.7982 18.1045 19.6936 16.9999 19.6936L6.99994 19.6936C5.89537 19.6936 4.99994 18.7982 4.99994 17.6936L4.99994 16.6936"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1.99994 12.6936H21.9999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default ScanIcon
