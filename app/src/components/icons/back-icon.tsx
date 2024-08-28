import { FC } from "react"

const BackIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="6"
      height="12"
      viewBox="0 0 6 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.46854 0.190011C5.79199 0.448768 5.84443 0.920737 5.58567 1.24418L1.96049 5.77566L5.58567 10.3071C5.84443 10.6306 5.79199 11.1026 5.46854 11.3613C5.14509 11.6201 4.67312 11.5676 4.41437 11.2442L0.414366 6.24418C0.195235 5.97027 0.195235 5.58106 0.414366 5.30714L4.41437 0.307141C4.67312 -0.0163054 5.14509 -0.0687464 5.46854 0.190011Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default BackIcon
