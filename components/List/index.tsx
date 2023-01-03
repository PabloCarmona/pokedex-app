import React from 'react'
import Card from '../Card'
import styles from './List.module.css'
import type { Pokemon } from '../../types'
import { fetchPokemons } from '../../utils/api'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'

interface Props {
  isFavorite: boolean
  pokemonType: string
  search: string
  viewMode: string
}

const List: React.FC<Props> = ({ isFavorite, search, pokemonType, viewMode }) => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['pokemons', isFavorite, search, pokemonType],
      queryFn: (pageParam) => fetchPokemons(pageParam, isFavorite, search, pokemonType),
      getNextPageParam: (lastPage, pages) =>
        lastPage?.items?.length && pages.length ? lastPage.offset + 10 : undefined,
    })

  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage({ cancelRefetch: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <>
      {status === 'loading' || isFetching && !isFetchingNextPage ? (
        <div className={styles.loading}>Loading pokedex...</div>
      ) : status === 'error' ? (
        <div className={styles.error}>
          There was an error while loading Pokedex. Refresh the page.
        </div>
      ) : (
            <ul className={styles[viewMode]}>
              {data?.pages.map((page) => (
            <React.Fragment key={crypto.randomUUID()}>
              {page.items.map((item: Pokemon) => (
                <li key={item.id}>
                  {<Card data={item} viewMode={viewMode} />}
                </li>
              ))}
            </React.Fragment>
          ))}
          <li id="last_list_element" ref={ref}></li>
        </ul>
      )}
    </>
  )
}

export default List
