import React from 'react'
import Grid from '../Icons/Grid'
import Menu from '../Icons/Menu'
import styles from './Header.module.css'
import { PokemonTypes } from '../../types'
import { fetchTypes } from '../../utils/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface Props {
  handleFavorites: (event: React.MouseEvent<HTMLButtonElement>, value: boolean) => void,
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  isFavorite: boolean,
  search: string
}

const Header: React.FC<Props> = ({ handleFavorites, handleSearch, isFavorite, search }) => {
  const { data: types }: UseQueryResult<PokemonTypes> = useQuery({
    queryKey: ['types'],
    queryFn: fetchTypes,
  })

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <button
          onClick={(event) => handleFavorites(event, false)}
          className={`${styles['nav-item']} ${!isFavorite && styles['nav-item-selected']}`}
        >
          All
        </button>
        <button
          onClick={(event) => handleFavorites(event, true)}
          className={`${styles['nav-item']} ${isFavorite && styles['nav-item-selected']}`}
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
          value={search}
          onChange={(event) => handleSearch(event)}
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
