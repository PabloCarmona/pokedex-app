import axios from 'axios'

const API_URL = 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest'

export default async function getPokemons() {
  try {
    const response = await axios.get(`${API_URL}/pokemon/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
