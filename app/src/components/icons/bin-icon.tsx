import { FC } from "react"

const BinIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d="M19 9.81494L18.2841 19.1217C18.1238 21.2057 16.386 22.8149 14.2959 22.8149H9.70412C7.61398 22.8149 5.87621 21.2057 5.71591 19.1217L5 9.81494M21 7.81494C18.4021 6.54892 15.3137 5.81494 12 5.81494C8.68635 5.81494 5.59792 6.54892 3 7.81494M10 5.81494V4.81494C10 3.71037 10.8954 2.81494 12 2.81494C13.1046 2.81494 14 3.71037 14 4.81494V5.81494M10 11.8149V17.8149M14 11.8149V17.8149"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  )
}

export default BinIcon
