export const renderTypes = (types: Array<string>): string =>
  types.length > 1 ? types.join(', ') : types.join('')
