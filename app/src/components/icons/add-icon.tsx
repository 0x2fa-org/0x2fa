import { FC } from "react"

const AddIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d="M11.9999 8.69363V16.6936M15.9999 12.6936H7.99994M17.9999 2.69363H5.99994C3.7908 2.69363 1.99994 4.4845 1.99994 6.69363V18.6936C1.99994 20.9028 3.7908 22.6936 5.99994 22.6936H17.9999C20.2091 22.6936 21.9999 20.9028 21.9999 18.6936V6.69363C21.9999 4.4845 20.2091 2.69363 17.9999 2.69363Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default AddIcon
