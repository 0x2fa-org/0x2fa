import { FC } from "react"

const SunIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2V3M12 21V22M19.0711 4.92894L18.364 5.63605M5.63605 18.364L4.92894 19.0711M22 12H21M3 12H2M19.071 19.0711L18.3639 18.364M5.63605 5.63605L4.92894 4.92894M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default SunIcon
