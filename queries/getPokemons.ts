import axios from 'axios'

export default async function getPokemons() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
