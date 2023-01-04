interface Dimensions {
  minimum: string
  maximum: string
}

export type Pokemon = {
  id: string
  image: string
  isFavorite: boolean
  name: string
  number: number
  types: Array<string>
}

export type PokemonDetail = Pokemon & {
  sound: string
  maxCP: number
  maxHP: number
  weight: Dimensions
  height: Dimensions
  evolutions: Array<Pokemon> | []
  previousEvolutions: Array<Pokemon> | []
}

export type PokemonTypes = Array<string>

export interface Page {
  limit: number
  offset: number
  count: number
  items: Array<Pokemon>
}

export interface InfiniteQueryPages {
  pageParams: Array<any>
  pages: Array<Page>
}
