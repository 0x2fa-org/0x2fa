import { FC } from "react"

const EmptyIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="63"
      height="69"
      viewBox="0 0 63 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.679932"
        y="0.0772705"
        width="62.266"
        height="68.6478"
        rx="5.47206"
        className="fill-[#F8F8F8] dark:fill-[#002220]"
      />
      <rect
        x="8.12921"
        y="9.51056"
        width="47.3674"
        height="21.4283"
        rx="4.10404"
        className="fill-[#E3E5E6] dark:fill-[#01302D]"
      />
      <rect
        x="8.12921"
        y="37.8635"
        width="47.3674"
        height="21.4283"
        rx="4.10404"
        className="fill-[#E3E5E6] dark:fill-[#01302D]"
      />
    </svg>
  )
}

export default EmptyIcon
