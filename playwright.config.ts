import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://api.github.com',
    headless: true, 

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    {
      name:'API Tests',
      testMatch: 'APITests/**/*',
      
      use:{
        baseURL:'https://api.github.com',
        extraHTTPHeaders: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization':`token ${process.env.API_Token}`, 
        }
      }
    }
  ],

});
