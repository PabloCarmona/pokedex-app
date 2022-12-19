import { test, expect } from '@playwright/test'

test('should render the home page', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Pokedex App')
})

// test('should render a list with pokemons', async ({ page }) => {
//   const items = await page.locator('ul > li')
//   await expect(await items.count()).toBeGreaterThanOrEqual(5)
// })
