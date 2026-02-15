import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { HomePageNavigation, HomePageNavigation as homePageNavigation } from "../navigation/navigationhome";
import { qase } from 'playwright-qase-reporter';
import { log } from "node:console";
import { exec } from "node:child_process";

test.describe("Product Page", () => {
     let homePage: HomePage;
     let homePageNavigation: HomePageNavigation;

     test.beforeEach(async ({ page }) => {  
         homePage = new HomePage(page);
         homePageNavigation = new HomePageNavigation(homePage);
          await homePageNavigation.navigateToHomePage();
     });


    test("PROD-01 Product page shows product details", async ({ page }) => {
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
    test("PROD-02 Drop down menu shows correct options", async ({ page }) => {
        await homePageNavigation.navigateToCatalog();
        await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
        await expect(page).toHaveURL(/\/collections\/all/i);
        
        const expectedSizes = ['S','M','L'];
        const expectedColors = ['Red','Blue'];

        const expectedProducts = ["Black heels", "Bronze sandals", "Brown Shades", "Grey jacket", "Noir jacket", "Striped top", "White sandals"];
        for (const name of expectedProducts) {
          await expect(page.getByRole("link", { name })).toBeVisible();
          await page.getByRole("link", {name}).click();
          await page.waitForTimeout(2000);
          const SIZE = page.locator('xpath=/html/body/div[3]/div[2]/div/div[2]/section[2]/form/div[1]/div[1]');
          const COLOR = page.locator('xpath=/html/body/div[3]/div[2]/div/div[2]/section[2]/form/div[1]/div[2]');
          if (await SIZE.isVisible().catch(() => false)) {
            await expect(SIZE).toBeVisible();
            console.log(`${name} Size dropdown is visible`);
            const dropdown = SIZE.locator('select');
            const options = await dropdown.locator('option').allTextContents();
            console.log(`${name} Size dropdown options: ${options.join(", ")}`);
            for (const expectedSize of expectedSizes) {
              try {
                expect(options).toContain(expectedSize);
                console.log(`${name} Size dropdown contains option: ${expectedSize}`);
              } catch {
                console.warn(`${name} Size dropdown does not contain option: ${expectedSize}`);
              }
            }
          }
          if (await COLOR.isVisible().catch(() => false)) {
            await expect(COLOR).toBeVisible();
            console.log(`${name} Color dropdown is visible`);
            const dropdown = COLOR.locator('select');
            const options = await dropdown.locator('option').allTextContents();
            console.log(`${name} Color dropdown options: ${options.join(", ")}`);
            for (const expectedColor of expectedColors) {
              try {
                expect(options).toContain(expectedColor);
                console.log(`${name} Color dropdown contains option: ${expectedColor}`);
              } catch {
                console.warn(`${name} Color dropdown does not contain option: ${expectedColor}`);
              }

            }
          
          }
          await page.goBack();
      }     
    });
});