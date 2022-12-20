import { test, expect } from '@playwright/test'

test.describe('home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render the page', async ({ page }) => {
    await expect(page.locator('main')).toBeTruthy()
  })

  test('should show a list of pokemons', async ({ page }) => {
    await expect(page.locator('ul > li')).toHaveCount(10)
  })
})
