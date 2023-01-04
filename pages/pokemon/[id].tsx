import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { fetchPokemon } from '../../utils/api'
import Spinner from '../../components/Spinner'
import { useQuery } from '@tanstack/react-query'
import Favorite from '../../components/Favorite'
import { renderTypes } from '../../utils/commons'
import Volume from '../../components/Icons/Volume'
import styles from '../../styles/DetailPage.module.css'

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

      {status === 'loading' || isFetching ? (
        <section className={styles.loading}>
          <Spinner className={styles['main-spinner']} />
          <p>Retrieving pokemon data...</p>
        </section>
      ) : (
        <section className={styles.main}>
            <article className={styles['detail-section']}>
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
                    <Favorite isFavorite={data.isFavorite} pokemonId={data.id} className={styles['favorite-icon']} />
                  </section>
                </section>
                <section className={styles.statistics}>
                  <article className={styles.statistic}>
                    <div className={`${styles['statistics-bar']} ${styles['statistics-bar-cp']}`}></div>
                    <p >CP: {data.maxCP}</p>
                  </article>
                  <article className={styles.statistic}>
                    <div className={`${styles['statistics-bar']} ${styles['statistics-bar-hp']}`}></div>
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
            </article>
          </section>
      )}
    </>
  )
}
