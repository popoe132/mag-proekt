import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { HomePageNavigation } from "../navigation/navigationhome";
import { qase } from 'playwright-qase-reporter';

test.describe("Authentication", () => {
    let homePage: HomePage;
    let homePageNavigation: HomePageNavigation;

    test.beforeEach(async ({ page }) => {  
        homePage = new HomePage(page);
        homePageNavigation = new HomePageNavigation(homePage);
        await homePageNavigation.navigateToHomePage();
    });  

  test("AUTH-01 Login page UI", async ({ page }) => {
    await homePageNavigation.navigateToLogin();
    await expect(page.getByRole("heading", { name: "Customer Login" })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();    
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole("link", { name: "Forgot your password?" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Sign In/i })).toBeVisible();
  });

  test("AUTH-02 Reset password form UI", async ({ page }) => {
    await homePageNavigation.navigateToLogin();
    await page.getByRole("link", { name: "Forgot your password?" }).click();
    await expect(page.getByRole("heading", { name: "Reset Password" })).toBeVisible();
    await expect(page.locator('#recover-email')).toBeVisible();
    await expect(page.getByText('Submit')).toBeVisible();
  });
  test("AUTH-03 Login with invalid credentials", async ({ page }) => {
    await homePageNavigation.navigateToLogin();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('invalid@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('invalidpassword');
    await page.getByRole("button", { name: /Sign In/i }).click();
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: /Sign In/i }).click();
    await expect(page.locator('iframe[title="hCaptcha challenge"]').contentFrame().locator('body')).toBeVisible();
    //await expect(page.getByText("Invalid email or password")).toBeVisible();
  });
  test("AUTH-04 Login with valid credentials", async ({ page }) => {
    await homePageNavigation.navigateToLogin();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('');
    await page.getByRole('textbox', { name: 'Password' }).fill('');
    await page.getByRole("button", { name: /Sign In/i }).click();
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: /Sign In/i }).click();
    await expect(page.locator('iframe[title="hCaptcha challenge"]').contentFrame().locator('body')).toBeVisible();
    //await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
  });

  test("AUTH-05 Registration page UI", async ({ page }) => {
    await homePageNavigation.navigateToCreateAccount();
    await expect(page.locator('input[name="customer[first_name]"]')).toBeVisible();
    await expect(page.locator('input[name="customer[last_name]"]')).toBeVisible();
    await expect(page.locator('input[name="customer[email]"]')).toBeVisible();    
    await expect(page.locator('input[name="customer[password]"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /Create/i })).toBeVisible();
  });
  test("AUTH-06 Registration with valid credentials", async ({ page }) => {    
    await homePageNavigation.navigateToCreateAccount();
    await page.locator('input[name="customer[first_name]"]').fill('Test'); 
    await page.locator('input[name="customer[last_name]"]').fill('User');
    await page.locator('input[name="customer[email]"]').fill('');
    await page.locator('input[name="customer[password]"]').fill('');
    await page.getByRole("button", { name: /Create/i }).click();
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: /Create/i }).click();
    await expect(page.locator('iframe[title="hCaptcha challenge"]').contentFrame().locator('body')).toBeVisible();
  });
  test("AUTH-06 Registration with existing email", async ({ page }) => {    
    await homePageNavigation.navigateToCreateAccount();
    await page.locator('input[name="customer[first_name]"]').fill('Test');
    await page.locator('input[name="customer[last_name]"]').fill('User');
    await page.locator('input[name="customer[email]"]').fill('test@test.com');
    await page.locator('input[name="customer[password]"]').fill('testtest');
    await page.getByRole("button", { name: /Create/i }).click();
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: /Create/i }).click();
    await expect(page.locator('iframe[title="hCaptcha challenge"]').contentFrame().locator('body')).toBeVisible();
    //await expect(page.getByText("This email address is already")).toBeVisible();
  });
  test("AUTH-07 Recovery password with valid email", async ({ page }) => {
    await homePageNavigation.navigateToLogin();
    await page.getByRole("link", { name: "Forgot your password?" }).click();
    await page.locator('#recover-email').fill('test@test.com');
    await page.getByText('Submit').click();
    await page.waitForTimeout(2000);
    await page.getByText('Submit').click();
    await expect(page.locator('iframe[title="hCaptcha challenge"]').contentFrame().locator('body')).toBeVisible();
    /*await expect(page.getByRole("heading", { name: "Customer Login" })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();    
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole("link", { name: "Forgot your password?" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Sign In/i })).toBeVisible(); */
  });
});

