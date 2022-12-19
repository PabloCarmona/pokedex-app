import { test, expect } from '@playwright/test'

test('should render the home page', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Pokedex App')
})
