import axios from 'axios'
import { API_URL } from './constants'

export const fetchPokemons = async ({ pageParam = 0 }) => {
  try {
    const res = await axios.get(`${API_URL}/pokemon?offset=${pageParam}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const fetchFavoritePokemons = async () => {
  try {
    const res = await axios.get(`${API_URL}/pokemon?isFavorite=true`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
