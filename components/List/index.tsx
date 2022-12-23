import React from 'react'
import axios from 'axios'
import Card from '../Card'
import styles from './List.module.css'
import type { Pokemon } from '../../types'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'

const API_URL = 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest'
const fetchPokemons = async ({ pageParam = 0 }) => {
  try {
    const res = await axios.get(`${API_URL}/pokemon?offset=${pageParam}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const List: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['pokemons'],
      queryFn: fetchPokemons,
      getNextPageParam: (lastPage, pages) =>
        lastPage.items.length && pages.length ? lastPage.offset + 10 : undefined,
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
      {status === 'loading' ? (
        <div className={styles.loading}>Loading pokedex...</div>
      ) : status === 'error' ? (
        <div className={styles.error}>
          There was an error while loading Pokedex. Refresh the page.
        </div>
      ) : (
        <ul className={styles.list}>
          {data.pages.map((page) => (
            <React.Fragment key={crypto.randomUUID()}>
              {page.items.map((item: Pokemon) => (
                <li key={item.id}>
                  <Card data={item} />
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
