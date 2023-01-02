import axios from 'axios'
import { API_URL } from './constants'

export const fetchPokemons = async (
  { pageParam = 0 },
  isFavorite = false,
  search = '',
  pokemonType = ''
) => {
  try {
    const res = await axios.get(
      `${API_URL}/pokemon?offset=${pageParam}${
        isFavorite && '&isFavorite=true'
      }&type=${pokemonType}&search=${search}`
    )
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const fetchTypes = async () => {
  try {
    const res = await axios.get(`${API_URL}/pokemon-types`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const toggleFavoritePokemon = async (
  pokemonId: string,
  action: 'favorite' | 'unfavorite'
) => {
  try {
    const res = await axios.post(`${API_URL}/pokemon/${pokemonId}/${action}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
