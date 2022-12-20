import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import Card from '../components/Card'
import type { Pokemon } from '../types'
import styles from '../styles/Home.module.css'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

const API_URL = 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest'


export default function Home() {
  const { ref, inView } = useInView()
  const fetchPokemons = async ({ pageParam = 0 }) => {
    try {
      const res = await axios.get(`${API_URL}/pokemon?offset=${pageParam}`)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.items.length && pages.length) {
        return lastPage.offset + 10
      }
      return undefined
    },
  })


  const renderList = () => {
    if (status === 'loading') {
      return (<div className={styles.loading}>Loading pokedex...</div>)
    }
    if (status === 'error') {
      console.log({ error })
      return (<div className={styles.error}>There was an error</div>)
    }

    return (
      <ul className={styles.list}>
        {
          data.pages.map(page => (
            <React.Fragment key={crypto.randomUUID()}>
              {page.items.map((item: Pokemon) => (
                <li key={item.id}><Card {...item} /></li>
              ))}
            </React.Fragment>
          ))
        }
        <li id="last_list_element" ref={ref}></li>
      </ul>
    )
  }

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage({ cancelRefetch: true })
    }
  }, [inView])

  return (
    <>
      <Head>
        <title>Pokedex App</title>
        <meta name="description" content="A Pokedex App to learn about Pokemons!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {renderList()}
    </>
  )
}
