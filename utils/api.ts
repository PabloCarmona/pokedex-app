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
      `${API_URL}/pokemon?offset=${pageParam}&isFavorite=${isFavorite}&type=${pokemonType}&search=${search}`
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