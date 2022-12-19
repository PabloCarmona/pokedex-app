import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useQuery } from '@tanstack/react-query'
import getPokemons from '../queries/getPokemons'
import Card from '../components/Card'
import type { Pokemon } from '../types'

export default function Home() {
  const { data } = useQuery({ queryKey: ['pokemons'], queryFn: getPokemons })
  console.log(data)

  const renderList = () => data?.items.map((item: Pokemon) => <li key={item.id}><Card {...item} /></li>)
  return (
    <>
      <Head>
        <title>Pokedex App</title>
        <meta name="description" content="A Pokedex App to learn about Pokemons!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Pokedex App</h1>
      </header>

      <main className={styles.main}>
        <ul className={styles.list}>
          {renderList()}
        </ul>
      </main>
    </>
  )
}
