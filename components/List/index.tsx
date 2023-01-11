import React from 'react'
import Card from '../Card'
import Spinner from '../Spinner'
import styles from './List.module.css'
import type { Page, Pokemon } from '../../types'
import { fetchPokemons } from '../../utils/api'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'

interface Props {
  isFavorite: boolean
  pokemonType: string
  search: string
  viewMode: string
}

const PAGINATION = 10

const List: React.FC<Props> = ({ isFavorite, search, pokemonType, viewMode }) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }: UseInfiniteQueryResult<Page, Error> = useInfiniteQuery({
    queryKey: ['pokemons', isFavorite, search, pokemonType],
    queryFn: (pageParam) => fetchPokemons(pageParam, isFavorite, search, pokemonType),
    getNextPageParam: (lastPage, pages) =>
      lastPage?.items?.length && pages.length ? lastPage.offset + PAGINATION : undefined,
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
      {status === 'loading' || (isFetching && !isFetchingNextPage) ? (
        <div className={styles.loading}>
          <Spinner className={styles['main-spinner']} />
          <p>Loading pokedex...</p>
        </div>
      ) : status === 'error' ? (
        <div className={styles.error}>
            <p>There was an error while loading Pokedex:</p>
            <p>{error.message}</p>
            <p>Refresh the page.</p>
        </div>
      ) : (
            <ul className={styles[viewMode]}>
              {data?.pages.map((page) => (
            <React.Fragment key={crypto.randomUUID()}>
              {page.items.map((item: Pokemon) => (
                <li key={item.id}>{<Card data={item} viewMode={viewMode} />}</li>
              ))}
            </React.Fragment>
          ))}
              <li id="last_list_element" ref={ref}>
                {hasNextPage && (
                  <>
                    {isFetchingNextPage ? (
                      <div className={styles['spinner-bottom']}>
                        <Spinner className={styles['main-spinner']} />
                      </div>
                    ) : null}
                    <button
                      disabled={isFetchingNextPage || !hasNextPage}
                      onClick={() => fetchNextPage({ cancelRefetch: true })}
                      className={styles['load-more-btn']}
                    >
                      {isFetchingNextPage ? (
                        <Spinner className={styles['load-more-btn-spinner']} />
                      ) : (
                        'Load More'
                      )}
                    </button>
                  </>
                )}
              </li>
        </ul>
      )}
    </>
  )
}

export default List
