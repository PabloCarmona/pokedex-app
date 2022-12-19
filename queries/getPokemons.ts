export default async function getPokemons() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/`)
  if (!response.ok) {
    throw new Error('Network response not ok')
  }
  return response.json()
}
