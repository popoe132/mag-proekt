import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { HomePageNavigation, HomePageNavigation as homePageNavigation } from "../navigation/navigationhome";
import { qase } from 'playwright-qase-reporter';

test.describe("Catalog", () => {
     let homePage: HomePage;
     let homePageNavigation: HomePageNavigation;

     test.beforeEach(async ({ page }) => {  
         homePage = new HomePage(page);
         homePageNavigation = new HomePageNavigation(homePage);
          await homePageNavigation.navigateToHomePage();
     });
  
    test("CAT-01 Catalog page shows  products", async ({ page }) => {
    await homePageNavigation.navigateToCatalog();
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();

    const expectedProducts = ["Black heels", "Bronze sandals", "Brown Shades", "Grey jacket", "Noir jacket", "Striped top", "White sandals"];
    for (const name of expectedProducts) {
      await expect(page.getByRole("link", { name })).toBeVisible();
    }
  });
  test("CAT-02 Navigate from catalog to all product page", async ({ page }) => {
    await homePageNavigation.navigateToCatalog();
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
    await expect(page).toHaveURL(/\/collections\/all/i);
  
    const expectedProducts = ["Black heels", "Bronze sandals", "Brown Shades", "Grey jacket", "Noir jacket", "Striped top", "White sandals"];
    for (const name of expectedProducts) {
      await expect(page.getByRole("link", { name })).toBeVisible();
      await page.getByRole("link", {name}).click();
      await expect(page.getByRole("heading", { name })).toBeVisible();
      await expect(page.locator("span.product-price")).toBeVisible();
      await page.goBack();
    }
    });
  test("CAT-03 Navigate from catalog to product page", async ({ page }) => {
    await homePageNavigation.navigateToCatalog();
    await page.getByRole("link", { name: "Grey jacket" }).click();
    await expect(page).toHaveURL(/\/grey-jacket/i);
    await expect(page.getByRole("heading", { name: "Grey jacket" })).toBeVisible();
    await expect(page.locator("span.product-price")).toBeVisible();
  });

  test("CAT-04 Add product to cart from catalog page", async ({ page }) => {
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
  test("CAT-05 Add product to cart from catalog page", async ({ page }) => {
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
    await expect(page.getByRole('button', { name: 'Check Out' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Remove' })).toBeVisible();
  });
});

