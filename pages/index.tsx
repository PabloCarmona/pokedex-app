import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useQuery } from '@tanstack/react-query'
import getPokemons from '../queries/getPokemons'

export default function Home() {
  const result = useQuery({ queryKey: ['pokemons'], queryFn: getPokemons })
  return (
    <>
      <Head>
        <title>Pokedex App</title>
        <meta name="description" content="A Pokedex App to learn about Pokemons!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header>
          <h1>Pokedex App</h1>
        </header>
      </main>
    </>
  )
}
