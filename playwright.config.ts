import type { PlaywrightTestConfig } from '@playwright/test'
const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    timeout: 180 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000',
  },
}

export default config
