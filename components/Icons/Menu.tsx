import React from 'react'

type Props = {
  className?: string
  onClick?: (event?: React.MouseEvent<SVGSVGElement>) => void
}

const Menu: React.FC<Props> = ({ className, onClick }) => (
  <svg
    id="menu-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={20}
    height={20}
    fill="none"
    className={className}
    onClick={onClick}
  >
    <rect fill="#ca3317" x="4" y="6" width="24" height="2" />
    <rect fill="#ca3317" x="4" y="24" width="24" height="2" />
    <rect fill="#ca3317" x="4" y="12" width="24" height="2" />
    <rect fill="#ca3317" x="4" y="18" width="24" height="2" />
    <rect
      id="_Transparent_Rectangle_"
      data-name="&lt;Transparent Rectangle&gt;"
      width="32"
      height="32"
    />
  </svg>
)

export default Menu
