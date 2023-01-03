import React from 'react'
import Image from 'next/image'
import Favorite from '../Favorite'
import styles from './Card.module.css'
import { useRouter } from 'next/router'
import type { Pokemon } from '../../types'
import { renderTypes } from '../../utils/commons'

interface Props {
  data: Pokemon
  viewMode?: string
}

const Card: React.FC<Props> = ({ data, viewMode }) => {
  const favoriteRef = React.useRef<SVGSVGElement>()
  const router = useRouter()
  const handleLocation = (event: any) => {
    if (event.target === favoriteRef.current || event.target.parentElement === favoriteRef.current)
      return
    router.push(`/pokemon/${data.id}`)
  }

  return (
    <div className={`${styles.card} ${viewMode && styles[viewMode]}`} onClick={handleLocation}>
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
        <Favorite _ref={favoriteRef} isFavorite={data.isFavorite} pokemonId={data.id} />
      </div>
    </div>
  )
}

export default Card
