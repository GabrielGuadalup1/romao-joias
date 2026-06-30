import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

// Carrega .env.local para os testes que rodam em node (ex.: getProdutos lê o Supabase)
dotenv.config({ path: '.env.local' })

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'line',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 375, height: 800 } } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
})
