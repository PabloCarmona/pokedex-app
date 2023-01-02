import React from 'react'
import { Pokemon } from '../../types'
import { toggleFavoritePokemon } from '../../utils/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  isFavorite: boolean
  pokemonId: string
}

const filterPokemons = (old: any, pokemonMutated: string) => {
  old.pages.map((page: any) => page.items)
    .flatMap((items: Array<Pokemon>) => items)
    .filter((pokemon: Pokemon) => pokemon.id !== pokemonMutated)
}


const Favorite: React.FC<Props> = ({ isFavorite, pokemonId }) => {
  const queryClient = useQueryClient()
  const [favorite, setFavorite] = React.useState(isFavorite)
  const favoritePokemon = useMutation({
    mutationKey: ['favorite'],
    mutationFn: (pokemonId: string) => toggleFavoritePokemon(pokemonId, 'favorite'),
    onMutate: async (pokemonMutated) => {
      setFavorite(true)
      await queryClient.cancelQueries({ queryKey: ['pokemons', false, '', ''] })
      const previousPokemons = queryClient.getQueryData(['pokemons', false, '', ''])
      queryClient.setQueryData(['pokemons', false, '', ''], (old) => filterPokemons(old, pokemonMutated))
      return { previousPokemons }
    },
    onSuccess: () => queryClient.refetchQueries({ queryKey: ['pokemons', false, '', ''] })
  })
  const unfavoritePokemon = useMutation({
    mutationKey: ['unfavorite'],
    mutationFn: (pokemonId: string) => toggleFavoritePokemon(pokemonId, 'unfavorite'),
    onMutate: async (pokemonMutated) => {
      setFavorite(false)
      await queryClient.cancelQueries({ queryKey: ['pokemons', true, '', ''] })
      const previousPokemons = queryClient.getQueryData(['pokemons', true, '', ''])
      queryClient.setQueryData(['pokemons', true, '', ''], (old) => filterPokemons(old, pokemonMutated))
      return { previousPokemons }
    },
    onSuccess: async (data) => {
      queryClient.refetchQueries({ queryKey: ['pokemons', true, '', ''] })
    }
  })
  return favorite ? (
    <svg
      fill="#ff0001"
      height="16"
      id="icon"
      onClick={() => {
        unfavoritePokemon.mutate(pokemonId)
      }}
      style={{ cursor: 'pointer' }}
      viewBox="0 0 32 32"
      width="16"
      x="0px"
      y="0px"
    >
      <path
        d="M22.5,4c-2,0-3.9,0.8-5.3,2.2L16,7.4l-1.1-1.1C12,3.3,7.2,3.3,4.3,6.2c0,0-0.1,0.1-0.1,0.1c-3,3-3,7.8,0,10.8L16,29
 l11.8-11.9c3-3,3-7.8,0-10.8C26.4,4.8,24.5,4,22.5,4z"
      />
      <rect id="_Transparent_Rectangle_" className="st0" width="16" height="16" fill="none" />
    </svg>
  ) : (
      <svg
        fill="#ff0001"
        height="16"
        id="icon"
        onClick={() => {
          favoritePokemon.mutate(pokemonId)
        }}
        style={{ cursor: 'pointer' }}
        viewBox="0 0 32 32"
        width="16"
      >
      <path d="M22.45,6a5.47,5.47,0,0,1,3.91,1.64,5.7,5.7,0,0,1,0,8L16,26.13,5.64,15.64a5.7,5.7,0,0,1,0-8,5.48,5.48,0,0,1,7.82,0L16,10.24l2.53-2.58A5.44,5.44,0,0,1,22.45,6m0-2a7.47,7.47,0,0,0-5.34,2.24L16,7.36,14.89,6.24a7.49,7.49,0,0,0-10.68,0,7.72,7.72,0,0,0,0,10.82L16,29,27.79,17.06a7.72,7.72,0,0,0,0-10.82A7.49,7.49,0,0,0,22.45,4Z" />
        <rect
          data-name="&lt;Transparent Rectangle&gt;"
          fill="none"
          height="16"
          id="_Transparent_Rectangle_"
          width="16"
      />
    </svg>
  )
}

export default Favorite
