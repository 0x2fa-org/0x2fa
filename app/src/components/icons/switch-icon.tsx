import { FC } from "react"

const SwitchIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.022 3.48972C12.809 3.2767 12.4636 3.2767 12.2506 3.48972C12.0376 3.70273 12.0376 4.04809 12.2506 4.26111L13.5013 5.51177H6.8181C4.50854 5.51177 2.63628 7.38404 2.63628 9.69359V10.4209C2.63628 10.7221 2.88049 10.9663 3.18174 10.9663C3.48298 10.9663 3.72719 10.7221 3.72719 10.4209V9.69359C3.72719 7.98653 5.11104 6.60268 6.8181 6.60268H14.8181C15.0387 6.60268 15.2376 6.46979 15.322 6.26597C15.4065 6.06214 15.3598 5.82753 15.2038 5.67153L13.022 3.48972ZM4.97782 15.8975C5.19084 16.1105 5.5362 16.1105 5.74921 15.8975C5.96223 15.6844 5.96223 15.3391 5.74921 15.1261L4.49854 13.8754H11.1817C13.4913 13.8754 15.3635 12.0031 15.3635 9.69358V8.96631C15.3635 8.66506 15.1193 8.42085 14.8181 8.42085C14.5168 8.42085 14.2726 8.66506 14.2726 8.96631V9.69358C14.2726 11.4006 12.8888 12.7845 11.1817 12.7845H3.1817C2.96109 12.7845 2.76219 12.9174 2.67777 13.1212C2.59334 13.325 2.64001 13.5596 2.79601 13.7156L4.97782 15.8975Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SwitchIcon
