import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { HomePageNavigation, HomePageNavigation as homePageNavigation } from "../navigation/navigationhome";
import { qase } from 'playwright-qase-reporter';
test("HP-02 Navigate to About Us page from Home page", async ({ page }) => {
    qase.ignore();
    await page.goto("/");
    await expect(page.locator('#main-menu').getByRole('link', { name: 'About Us' })).toBeVisible();
    
    await page.locator('#main-menu').getByRole('link', { name: 'About Us' }).click();
   
    await expect(page).toHaveURL(/.*about-us/);

});   

test("HP-04 Navigate to Blog page from Home page", async ({ page }) => {
    qase.ignore();
    await page.goto("/");
    await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible(); 
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/.*blog/);
});     

