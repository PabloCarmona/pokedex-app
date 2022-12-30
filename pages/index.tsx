import React from 'react'
import Head from 'next/head'
import List from '../components/List'
import Header from '../components/Header'

export default function Home(): JSX.Element {
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false)
  const [search, setSearch] = React.useState<string>('')

  return (
    <>
      <Head>
        <title>Pokedex App</title>
        <meta name="description" content="A Pokedex App to learn about Pokemons!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        isFavorite={isFavorite}
        handleFavorites={(event, value) => setIsFavorite(value)}
        handleSearch={(event) => setSearch(event.target.value)}
        search={search}
      />
      <List isFavorite={isFavorite} search={search} />
    </>
  )
}
