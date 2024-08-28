import { FC } from "react"

const MoonIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.5271 14.8687C11.6065 14.8687 15.7241 10.751 15.7241 5.67163C15.7241 4.74246 15.5863 3.84548 15.3301 3C19.1065 4.14461 21.8555 7.65276 21.8555 11.803C21.8555 16.8824 17.7378 21 12.6584 21C8.50823 21 5.00008 18.251 3.85547 14.4746C4.70095 14.7309 5.59793 14.8687 6.5271 14.8687Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default MoonIcon
