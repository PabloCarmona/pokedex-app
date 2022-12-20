import { test, expect } from '@playwright/test'

test.describe('home page', () => {
  test.use({
    viewport: { width: 530, height: 900 },
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render the page', async ({ page }) => {
    await expect(page.locator('main')).toBeTruthy()
  })

  test('should show a list of pokemons', async ({ page }) => {
    await expect(page.locator('ul > li')).toHaveCount(11)
  })

  test('should show more pokemons as the user scroll down', async ({ page }) => {
    await page.locator('ul > li').nth(9).waitFor()
    await page.evaluate(() =>
      document
        .querySelector('#last_list_element')
        ?.scrollIntoView({ block: 'end', inline: 'nearest' })
    )
    await expect(page.locator('ul > li')).toHaveCount(21)
  })
})
