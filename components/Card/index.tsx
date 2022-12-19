import React from 'react'
import Image from 'next/image'
import Favorite from '../Favorite'
import type { Pokemon } from '../../types'
import styles from './Card.module.css'

const renderTypes = (types: Array<string>): string =>
  types.length > 1 ? types.join(', ') : types.join('')

const Card = (props: Pokemon) => {
  return (
    <div className={styles.card}>
      <div className={styles['image-wrapper']}>
        <Image
          className={styles.image}
          src={props.image}
          alt={`An image of a ${props.name}`}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.info}>
        <div>
          <p className={styles.name}>{props.name}</p>
          <p className={styles.types}>{renderTypes(props.types)}</p>
        </div>
        <Favorite />
      </div>
    </div>
  )
}

export default Card
