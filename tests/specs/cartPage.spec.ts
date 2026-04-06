import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { HomePageNavigation, HomePageNavigation as homePageNavigation } from "../navigation/navigationhome";
import { qase } from 'playwright-qase-reporter';
import { exitCode } from "node:process";


test.describe("Cart", () => {
    let homePage: HomePage;
    let homePageNavigation: HomePageNavigation;

    test.beforeEach(async ({ page }) => {  
        homePage = new HomePage(page);
        homePageNavigation = new HomePageNavigation(homePage);
        await homePageNavigation.navigateToHomePage();
    });  
  
    test("CRT-01 Empty checkoutcart state", async ({ page }) => {
      await homePage.checkoutLink.click();
      await expect(page).toHaveURL(/\/cart/i);
      await expect(page.getByRole("heading", { name: "My Cart" })).toBeVisible();
      await expect(page.getByText("It appears that your cart is currently empty!")).toBeVisible();
    });
  test("CRT-02 Product appears in checkout cart", async ({ page }) => {
    await homePageNavigation.navigateToCatalog();
    await page.getByRole("link", { name: "Grey jacket" }).click();
    await page.getByRole("button", { name: "Add to cart" }).click();
    //await expect(page.getByRole("alert")).toHaveText(/added to your cart/i);
    await page.waitForTimeout(3000);
    await homePage.checkoutLink.click();
    await expect(page).toHaveURL(/\/cart/i);
    await expect(page.getByRole("heading", { name: "My Cart" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Grey jacket" })).toBeVisible();
  });
  test("CRT-03 Empty appears in the cart popup", async ({ page }) => {
    await homePage.page.goto("https://sauce-demo.myshopify.com");
    await homePage.myCartLink.click();
    await expect(page.getByText("Your cart is empty")).toBeVisible();
  });
  test("CRT-04 Product appears in the cart popup", async ({ page }) => {
    await homePageNavigation.navigateToCatalog();
    await page.getByRole("link", { name: "Grey jacket" }).click();
    await page.getByRole("button", { name: "Add to cart" }).click();
    //await expect(page.getByRole("alert")).toHaveText(/added to your cart/i);
    await page.waitForTimeout(3000);
    await homePage.myCartLink.click();
    await page.waitForTimeout(3000);
    await page.reload();
    await homePage.myCartLink.click();
    await expect(homePage.page.locator('div').nth(3)).toBeVisible();    
    await expect(page.getByRole('link', { name: 'Grey jacket - Grey jacket -' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Remove' })).toBeVisible();
  });
  test("CRT-05 Remove product from cart popup", async ({ page }) => {
    await homePageNavigation.navigateToCatalog();
    await page.getByRole("link", { name: "Grey jacket" }).click();
    await page.getByRole("button", { name: "Add to cart" }).click();
    //await expect(page.getByRole("alert")).toHaveText(/added to your cart/i);
    await page.waitForTimeout(2000);
    await homePage.myCartLink.click();
    await page.waitForTimeout(2000);
    await page.reload();
    await homePage.myCartLink.click();
    await expect(homePage.page.locator('div').nth(3)).toBeVisible();    
    await expect(page.getByRole('link', { name: 'Grey jacket - Grey jacket -' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Remove' })).toBeVisible();
    await page.getByRole('link', { name: 'Remove' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText("Your cart is empty")).toBeVisible();
    });  
    test ("CRT-06 Remove product from checkout cart", async ({ page }) => {
    await homePageNavigation.navigateToCatalog();
    await page.getByRole("link", { name: "Grey jacket" }).click();
    await page.getByRole("button", { name: "Add to cart" }).click();
    //await expect(page.getByRole("alert")).toHaveText(/added to your cart/i);
    await page.waitForTimeout(3000);
    await homePage.checkoutLink.click();
    await expect(page).toHaveURL(/\/cart/i);
    await expect(page.getByRole("heading", { name: "My Cart" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Grey jacket" })).toBeVisible();
    await page.getByRole('link', { name: 'x' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText("It appears that your cart is currently empty!")).toBeVisible();
    await page.getByText("Continue shopping").click();
    await expect(page).toHaveURL(/\/collections\/all/i);
    });
    test("CRT-07 Product quantity in cart popup", async ({ page }) => {
    await homePage.page.goto("https://sauce-demo.myshopify.com");
    await homePageNavigation.navigateToCatalog();
    await page.getByRole("link", { name: "Grey jacket" }).click();
    await page.getByRole("button", { name: "Add to cart" }).click();
    //await expect(page.getByRole("alert")).toHaveText(/added to your cart/i);
    await page.waitForTimeout(2000);
    await homePage.myCartLink.click();
    await page.waitForTimeout(2000);
    await page.reload();
    await homePage.myCartLink.click();
    await expect(homePage.page.locator('div').nth(3)).toBeVisible();    
    await expect(page.getByRole('link', { name: 'Grey jacket - Grey jacket -' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Remove' })).toBeVisible();
    const quantityInput = page.locator('#updates_611945025');
    await expect(quantityInput).toBeVisible();
    await expect(quantityInput).toHaveValue('1');
    await quantityInput.fill('2');
    await quantityInput.blur();
    await page.waitForTimeout(2000);
    await expect(quantityInput).toHaveValue('2');
    });
  test("CRT-08 Checkout redirected to checkout page", async ({ page }) => {
    await homePageNavigation.navigateToCatalog();
    await page.getByRole("link", { name: "Grey jacket" }).click();
    await page.getByRole("button", { name: "Add to cart" }).click();
    //await expect(page.getByRole("alert")).toHaveText(/added to your cart/i);
    await page.waitForTimeout(3000);
    await homePage.checkoutLink.click();
    await expect(page).toHaveURL(/\/cart/i);
    await expect(page.getByRole("heading", { name: "My Cart" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Grey jacket" })).toBeVisible();
    await page.getByRole('button', { name: 'Check Out' }).click();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/\/checkout/i);
  });
});