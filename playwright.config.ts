import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';
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
  reporter: [
    ['html'],['github'],['junit', { outputFile: 'results.xml' }], 
    ['playwright-qase-reporter',
      {
        testops: {
          api: {
            token: 'b8c15278af8d019ce10ba8db2b546103760070aed929ce8d9b098ade35dea99a',
          },
          project: 'MP',
        },
      },
    ],
  ],
  use: {
    //baseURL: 'https://sauce-demo.myshopify.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npx serve',
    url: 'http://localhost:3000',
    cwd: './Site/Mag/sauce-demo.myshopify.com',
    timeout: 120 * 1000,
    reuseExistingServer: true,
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
  ],
});
const config: PlaywrightTestConfig = {
use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
webServer: {
    command: 'npx serve',
    url: 'http://localhost:3000',
    cwd: './Site/Mag/sauce-demo.myshopify.com',
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
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
  ],
  reporter: [
    ['list'],
    ['github'],
    ['junit', { outputFile: 'results.xml' }],
    ['html'],
    [
      'playwright-qase-reporter',
      {
        debug: false,

        testops: {
          api: {
            token: 'b8c15278af8d019ce10ba8db2b546103760070aed929ce8d9b098ade35dea99a',
          },

          project: 'MP',
          uploadAttachments: true,
          showPublicReportLink: true,

          run: {
            complete: true,
          },
        },
      },
    ],
  ],
};

module.exports = config;