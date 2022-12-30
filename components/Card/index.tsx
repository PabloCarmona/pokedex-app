import React from 'react'
import Image from 'next/image'
import Favorite from '../Favorite'
import type { Pokemon } from '../../types'
import styles from './Card.module.css'

type Props = {
  data: Pokemon
}

const renderTypes = (types: Array<string>): string =>
  types.length > 1 ? types.join(', ') : types.join('')

const Card: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.card}>
      <div className={styles['image-wrapper']}>
        <Image
          className={styles.image}
          src={data.image}
          alt={`An image of a ${data.name}`}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.info}>
        <div>
          <p className={styles.name}>{data.name}</p>
          <p className={styles.types}>{renderTypes(data.types)}</p>
        </div>
        <Favorite isFavorite={data.isFavorite} />
      </div>
    </div>
  )
}

export default Card
