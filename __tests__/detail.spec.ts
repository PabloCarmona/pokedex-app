import { test, expect } from '@playwright/test'

test.describe.parallel('detail page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pokemon/001')
  })

  test('should render the page', async ({ page }) => {
    await expect(page.locator('main')).toBeTruthy()
  })

  test('should show detail of a pokemon', async ({ page }) => {
    await expect(
      page.locator('section').filter({ hasText: 'BulbasaurGrass, Poison' }).nth(2)
    ).toBeVisible()
  })

  test('click on go back button should navigate to home page', async ({ page }) => {
    await page.getByRole('link', { name: 'Go back home' }).click()
    await expect(page.url()).toMatch(/\//)
  })
})
