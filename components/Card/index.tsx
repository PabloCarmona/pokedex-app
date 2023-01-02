import React from 'react'
import Image from 'next/image'
import Favorite from '../Favorite'
import styles from './Card.module.css'
import type { Pokemon } from '../../types'

interface Props {
  data: Pokemon
}

const renderTypes = (types: Array<string>): string =>
  types.length > 1 ? types.join(', ') : types.join('')

const Card: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.card}>
      <div className={styles['image-wrapper']}>
        <Image
          alt={`An image of a ${data.name}`}
          className={styles.image}
          height={500}
          src={data.image}
          width={500}
        />
      </div>
      <div className={styles.info}>
        <div>
          <p className={styles.name}>{data.name}</p>
          <p className={styles.types}>{renderTypes(data.types)}</p>
        </div>
        <Favorite isFavorite={data.isFavorite} pokemonId={data.id} />
      </div>
    </div>
  )
}

export default Card
