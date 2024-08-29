import { FC } from "react"

const WarningIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="0.989746"
        width="40"
        height="40"
        rx="20"
        fill="#FFFF8F"
      />
      <circle
        cx="20.5"
        cy="25.9897"
        r="1"
        transform="rotate(-180 20.5 25.9897)"
        fill="#002D2B"
      />
      <path
        d="M20.5 22.9897L20.5 15.9897M11.5 18.1217V23.8578C11.5 25.3811 12.2923 26.7888 13.5785 27.5504L18.4215 30.4185C19.7077 31.1802 21.2923 31.1802 22.5785 30.4185L27.4215 27.5504C28.7077 26.7888 29.5 25.3811 29.5 23.8578V18.1217C29.5 16.5983 28.7077 15.1907 27.4215 14.4291L22.5785 11.561C21.2923 10.7993 19.7077 10.7993 18.4215 11.561L13.5785 14.4291C12.2923 15.1907 11.5 16.5983 11.5 18.1217Z"
        stroke="#002D2B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default WarningIcon
