import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Card from '../../components/Card'
import { PokemonDetail } from '../../types'
import { fetchPokemon } from '../../utils/api'
import Spinner from '../../components/Spinner'
import Favorite from '../../components/Favorite'
import { renderTypes } from '../../utils/commons'
import Volume from '../../components/Icons/Volume'
import styles from '../../styles/DetailPage.module.css'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

export default function DetailPage(): JSX.Element {
  const queryClient = useQueryClient()
  const { id } = useRouter().query
  const { data, error, status, isFetching }: UseQueryResult<PokemonDetail, Error> = useQuery({
    queryKey: ['pokemonDetail', id],
    queryFn: () => fetchPokemon(id?.toString()),
  })

  const playSound = (url: string) => {
    const audio = new Audio(url)
    audio.play()
  }

  React.useEffect(() => {
    if (id) {
      queryClient.fetchQuery({ queryKey: ['pokemonDetail', id] })
    }
  }, [queryClient, id])

  return (
    <>
      <Head>
        <title>Pokedex App | Pokemon</title>
        <meta name="description" content="A Pokedex App to learn about Pokemons!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {status === 'loading' || isFetching ? (
        <section className={styles.loading}>
          <Spinner className={styles['main-spinner']} />
          <p>Retrieving pokemon data...</p>
        </section>
      ) : status === 'error' ? (
        <div className={styles.error}>
          <p>There was an error while loading Pokedex:</p>
          <p>{error.message}</p>
          <p>Refresh the page.</p>
        </div>
      ) : (
        <section className={styles.main}>
              <Link className={styles.link} href='/'>Go back home</Link>
              <section className={styles['detail-section']}>
            <div className={styles['image-wrapper']}>
              <Image
                alt={`An image of a ${data.name}`}
                className={styles.image}
                height={500}
                src={data.image}
                width={500}
              />
            </div>
                <section className={styles.controls}>
                  <Volume onClick={() => playSound(data.sound)} className={styles.volume} />
                </section>
                <footer className={styles.footer}>
                  <section className={styles.info}>
                    <section>
                      <h1 className={styles['info-heading']}>{data.name}</h1>
                      <p>{renderTypes(data.types)}</p>
                    </section>
                    <section>
                      <Favorite
                        isFavorite={data.isFavorite}
                        pokemonId={data.id}
                        className={styles['favorite-icon']}
                      />
                    </section>
                  </section>
                  <section className={styles.statistics}>
                    <article className={styles.statistic}>
                      <div
                        className={`${styles['statistics-bar']} ${styles['statistics-bar-cp']}`}
                      ></div>
                      <p>CP: {data.maxCP}</p>
                    </article>
                    <article className={styles.statistic}>
                      <div
                        className={`${styles['statistics-bar']} ${styles['statistics-bar-hp']}`}
                      ></div>
                      <p>HP: {data.maxHP}</p>
                    </article>
                  </section>
                  <section className={styles.dimensions}>
                    <article>
                      <h2 className={styles['dimensions-heading']}>Weight</h2>
                      <p>
                        {data.weight.minimum} - {data.weight.maximum}
                      </p>
                    </article>
                    <article>
                      <h2 className={styles['dimensions-heading']}>Height</h2>
                      <p>
                        {data.height.minimum} - {data.height.maximum}
                      </p>
                    </article>
                  </section>
                </footer>
              </section>
              {(data.evolutions.length || data.previousEvolutions.length) ? (
                <section className={styles.evolutions}>
                  <h2>Evolutions</h2>
                  <section className={styles['evolutions-list']}>
                    {data.previousEvolutions.map(pokemon => <Card key={pokemon.id} data={pokemon} />).reverse()}
                    {data.evolutions.map(pokemon => <Card key={pokemon.id} data={pokemon} />)}
                  </section>
                </section>
              ) : null}
            </section>
      )}
    </>
  )
}
