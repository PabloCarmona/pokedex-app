import React from 'react'
import axios from 'axios'
import styles from './Header.module.css'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import Grid from '../Icons/Grid'
import Menu from '../Icons/Menu'
import { PokemonTypes } from '../../types'

const API_URL = 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest'
const fetchTypes = async () => {
  try {
    const res = await axios.get(`${API_URL}/pokemon-types`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const Header: React.FC = () => {
  const [showFavorites, setShowFavorites] = React.useState(false)
  const { data: types }: UseQueryResult<PokemonTypes> = useQuery({
    queryKey: ['types'],
    queryFn: fetchTypes,
  })

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <button
          onClick={() => setShowFavorites(false)}
          className={`${styles['nav-item']} ${!showFavorites && styles['nav-item-selected']}`}
        >
          All
        </button>
        <button
          onClick={() => setShowFavorites(true)}
          className={`${styles['nav-item']} ${showFavorites && styles['nav-item-selected']}`}
        >
          Favorites
        </button>
      </nav>
      <form className={styles.filters}>
        <input
          className={styles.search}
          type="search"
          name="search"
          id="search-input"
          placeholder="Search"
        />
        <select className={styles.select} name="type" id="type-select" defaultValue={'default'}>
          <option value={'default'} disabled>
            Type
          </option>
          {types?.map((type: string) => (
            <option key={crypto.randomUUID()} value={type}>
              {type}
            </option>
          ))}
        </select>
        <Grid className={styles['view-controls']} />
        <Menu className={styles['view-controls']} />
      </form>
    </header>
  )
}

export default Header
