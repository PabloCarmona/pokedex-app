import { useQueryClient } from '@tanstack/react-query'

export const useRefetchQueries = () => {
  console.log('hook called')
  const queryClient = useQueryClient()
  return queryClient.refetchQueries({ queryKey: ['pokemons'], stale: true })
}
