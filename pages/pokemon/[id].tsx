import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { fetchPokemon } from '../../utils/api'
import Spinner from '../../components/Spinner'
import { useQuery } from '@tanstack/react-query'
import { renderTypes } from '../../utils/commons'
import Volume from '../../components/Icons/Volume'
import styles from '../../styles/DetailPage.module.css'
import Favorite from '../../components/Favorite'

export default function DetailPage(): JSX.Element {
  const { id } = useRouter().query
  const { data, error, status, isFetching } = useQuery({
    queryKey: ['pokemonDetail', id],
    queryFn: () => fetchPokemon(id?.toString()),
  })

  const playSound = (url: string) => {
    const audio = new Audio(url)
    audio.play()
  }

  return (
    <>
      <Head>
        <title>Pokedex App | Pokemon</title>
        <meta name="description" content="A Pokedex App to learn about Pokemons!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        status === 'loading' || isFetching ? (
          <div className={styles.loading}>
            <Spinner className={styles['main-spinner']} />
            <p>Retrieving pokemon data...</p>
          </div>
        ) : (
          <section className={styles.main}>
            <div className={styles['image-wrapper']}>
              <Image
                alt={`An image of a ${data.name}`}
                className={styles.image}
                height={500}
                src={data.image}
                width={500}
              />
            </div>
            <Volume onClick={() => playSound(data.sound)} />
            <Favorite isFavorite={data.isFavorite} pokemonId={data.id} />
            <section className={styles.info}>
              <article>
                <h1>{data.name}</h1>
                <p>{renderTypes(data.types)}</p>
              </article>
              <article className={styles.statistics}>
                <p>CP: {data.maxCP}</p>
                <p>HP: {data.maxHP}</p>
              </article>
            </section>
            <section>
              <article>
                <p>Weight</p>
                <p>{data.weight.minimum} - {data.weight.maximum}</p>
              </article>
              <article>
                <p>Height</p>
                <p>{data.height.minimum} - {data.height.maximum}</p>
              </article>
            </section>
          </section>
        )
      }
    </>
  )
}
