import React from 'react'
import Head from 'next/head'
import List from '../components/List'


export default function Home() {


  return (
    <>
      <Head>
        <title>Pokedex App</title>
        <meta name="description" content="A Pokedex App to learn about Pokemons!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <List />
    </>
  )
}
