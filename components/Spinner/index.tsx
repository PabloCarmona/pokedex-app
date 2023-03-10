import React from 'react'
import styles from './Spinner.module.css'

interface Props {
  className?: string
}

const Spinner: React.FC<Props> = ({ className }) => (
  <div className={`${styles.spinner} ${className}`}></div>
)

export default Spinner
