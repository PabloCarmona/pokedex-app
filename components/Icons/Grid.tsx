import React, { MouseEventHandler } from 'react'

type Props = {
  className?: string,
  onClick?: (event?: React.MouseEvent<SVGSVGElement>) => void
}

const Grid: React.FC<Props> = ({ className, onClick }) => (
  <svg
    id="grid-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    width={20}
    height={20}
    className={className}
    onClick={onClick}
  >
    <path
      fill="#ca3317"
      d="M12,4H6A2,2,0,0,0,4,6v6a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V6A2,2,0,0,0,12,4Zm0,8H6V6h6Z"
    />
    <path
      fill="#ca3317"
      d="M26,4H20a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4Zm0,8H20V6h6Z"
    />
    <path
      fill="#ca3317"
      d="M12,18H6a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V20A2,2,0,0,0,12,18Zm0,8H6V20h6Z"
    />
    <path
      fill="#ca3317"
      d="M26,18H20a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V20A2,2,0,0,0,26,18Zm0,8H20V20h6Z"
    />
    <rect
      id="_Transparent_Rectangle_"
      data-name="&lt;Transparent Rectangle&gt;"
      width="32"
      height="32"
    />
  </svg>
)

export default Grid
