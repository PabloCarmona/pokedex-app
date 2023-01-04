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

  test('should show list of pokemons in a list view when user clicks on view mode button', async ({
    page,
  }) => {
    await page.locator('#menu-icon').click()
    await expect(page.locator('ul')).toHaveClass(/list/)
  })

  test('should find Squirtle when user types its name on the input search', async ({ page }) => {
    await page.locator('#search-input').type('squirtle')
    await expect(page.getByText('Squirtle')).toBeVisible()
  })

  test('should go to the pokemon page detail once user clicks on a Pokemon card', async ({
    page,
  }) => {
    await page
      .getByRole('article')
      .filter({ hasText: 'BulbasaurGrass, Poison' })
      .locator('div')
      .first()
      .click()
    await page.waitForNavigation()
    await expect(page.url()).toMatch(/\/pokemon\/001/)
  })
})
