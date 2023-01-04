import axios, { AxiosError } from 'axios'

const API_URL = 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest'

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
    return (error as AxiosError).response
  }
}

export const fetchPokemon = async (id = '') => {
  try {
    const res = await axios.get(`${API_URL}/pokemon/${id}`)
    return res.data
  } catch (error) {
    return (error as AxiosError).response
  }
}

export const fetchTypes = async () => {
  try {
    const res = await axios.get(`${API_URL}/pokemon-types`)
    return res.data
  } catch (error) {
    return (error as AxiosError).response
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
    return (error as AxiosError).response
  }
}
