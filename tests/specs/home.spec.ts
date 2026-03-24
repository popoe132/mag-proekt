import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { HomePageNavigation, HomePageNavigation as homePageNavigation } from "../navigation/navigationhome";
import { qase } from 'playwright-qase-reporter';

// $env:QASE_MODE="testops"; $env:QASE_DEBUG="true"; npx playwright test - TOVA ZA LOCALNO PUSKANE KYM QASE


test.describe("Home Page Navigaciq", () => {
    let homePage: HomePage;
    let homePageNavigation: HomePageNavigation;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePageNavigation = new HomePageNavigation(homePage);
        await homePageNavigation.navigateToHomePage();
        //await page.goto("/");
    });


test("Home", async () => {
        await expect(homePage.menuHome).toBeVisible();
        await expect(homePage.menuAboutUs).toBeVisible();
        await expect(homePage.menuWishList).toBeVisible();
        await expect(homePage.menuReferAFriend).toBeVisible();
        await expect(homePage.menuCatalog).toBeVisible();
        await expect(homePage.menuBlog).toBeVisible();
    });

test("Do About Us", async () => {
        await homePageNavigation.navigateToAboutUs();        
    });
test ("Do Wish List", async () => {
        await homePageNavigation.navigateToWishList();        
    });
test("Do Refer A Friend", async () => {
        await homePageNavigation.navigateToReferAFriend();        
    }); 
test("Do Catalog", async () => {
        await homePageNavigation.navigateToCatalog();        
    });
test("Do Blog", async () => {
        await homePageNavigation.navigateToBlog();               
    });
test("Do Social Facebook", async () => {
        await homePageNavigation.navigateToSocial();
        const waitingforpage = homePage.page.context().waitForEvent('page');        
        await homePage.FacebookLink.click();
        //await homePage.menuSocial.getByRole('link').filter({ hasText: /^$/ }).first().click();    
        const newPage = await waitingforpage;
        await newPage.waitForLoadState(); 
            console.log(await newPage.url()); 
        await expect(newPage).toHaveURL(/.*facebook\.com/);  
        //await expect(newPage).toHaveURL("https://www.facebook.com/shopify");
        });
        
test ("Do Social Twitter", async ({browserName}) => { 
        await homePageNavigation.navigateToSocial();   
        const waitingforpage = homePage.page.context().waitForEvent('page');        
        await homePage.TwitterLink.click();
        //await homePage.menuSocial.getByRole('link').filter({ hasText: /^$/ }).nth(1).click();    
        const newPage = await waitingforpage;
        await newPage.waitForLoadState();
            console.log(await newPage.url());
        if (browserName === "webkit") {
        await expect(newPage).toHaveURL(/.*twitter\.com\/sauce/);  
        //await expect(newPage).toHaveURL("https://twitter.com/sauce_io");
        } else {
        await expect(newPage).toHaveURL(/.*x\.com\/sauce/);  
        //await expect(newPage).toHaveURL("https://x.com/sauce_io");
        }
    });
test ("Do Instagram", async () => {
        test.setTimeout(500_000);
        await homePageNavigation.navigateToSocial();   
        const waitingforpage = homePage.page.context().waitForEvent('page');        
        await homePage.InstagramLink.click();
        //await homePage.menuSocial.getByRole('link').filter({ hasText: /^$/ }).nth(2).click();    
        const newPage = await waitingforpage;
        await newPage.waitForLoadState();
            console.log(await newPage.url());
        await expect(newPage).toHaveURL(/.*instagram\.com/);  
        //await expect(newPage).toHaveURL("https://www.instagram.com/shopify");
    });
test ("Do Pinterest", async () => {
        await homePageNavigation.navigateToSocial();   
        const waitingforpage = homePage.page.context().waitForEvent('page');        
        await homePage.PinterestLink.click();
        //await homePage.menuSocial.getByRole('link').filter({ hasText: /^$/ }).nth(3).click();    
        const newPage = await waitingforpage;
        await newPage.waitForLoadState();
            console.log(await newPage.url());
        await expect(newPage).toHaveURL(/.*pinterest\.com\/chrisjhoughton\/social-design/);  
        //await expect(newPage).toHaveURL("https://www.pinterest.com/chrisjhoughton/social-design/");
        
    });

test ("Do News", async ({browserName}) => {
        await homePageNavigation.navigateToSocial();
        
        if (browserName === "firefox") {
            const newdownload = homePage.page.waitForEvent('download');        
            await homePage.newslinkdownload.click();
            //await homePage.menuSocial.getByRole('link').filter({ hasText: /^$/ }).nth(4).click();    
            const download = await newdownload;
            await download.saveAs('./downloads/'+ download.suggestedFilename());
            
                console.log('File downloaded to: ' + './downloads/' + download.suggestedFilename());

            await expect(download.suggestedFilename()).toBe('news.atom');
            } 
            else {            
            const waitingforpage = homePage.page.context().waitForEvent('page');        
            await homePage.newslinkdownload.click();
            //await homePage.menuSocial.getByRole('link').filter({ hasText: /^$/ }).nth(3).click();    
            const newPage = await waitingforpage;
            await newPage.waitForLoadState();
                console.log(await newPage.url());
            await expect(newPage).toHaveURL(/.*news\.atom/);  
            //await expect(newPage).toHaveURL("https://www.pinterest.com/chrisjhoughton/social-design/");
            }

    });
});

test.describe("Nav Tests", () => { 
    let homePage: HomePage;
    let homePageNavigation: HomePageNavigation;
    
    test.beforeEach(async ({ page }) => {  
        homePage = new HomePage(page);
        homePageNavigation = new HomePageNavigation(homePage);
         await homePageNavigation.navigateToHomePage();
    });

    test("Nav There?", async () => {
        await expect (homePage.menuSearchnav).toBeVisible();
            await expect (homePage.searchInput).toBeVisible();
            await expect (homePage.searchButton).toBeVisible();
        await expect (homePage.SearchLinknav).toBeVisible();
        await expect (homePage.menuAboutUsnav).toBeVisible();
        await expect (homePage.menuLoginnav).toBeVisible();
        await expect (homePage.menuCreateAccountnav).toBeVisible();
        //cart        
        await expect (homePage.myCartLink).toBeVisible();
        await expect (homePage.checkoutLink).toBeVisible();   
    });
    
    test("Nav Search", async () => {
        await homePage.menuSearchnav.click();
        await homePage.searchInput.fill("shirt");
        await homePage.searchButton.click();
        //console.log(await homePage.page.url());
        await expect(homePage.page).toHaveURL(/.*search\?type=product&q=shirt/); 
        //await expect(homePage.page).toHaveURL("https://sauce-demo.myshopify.com/search?type=product&q=shirt"); 
    });

    test( "Search", async () => {
        await homePage.SearchLinknav.click();      
        await expect(homePage.page).toHaveURL(/.*search/); 
        
    });
    test("Nav About Us", async () => {
        await homePage.menuAboutUsnav.click();
        await expect(homePage.page).toHaveURL(/.*about-us/); 
    });
    test("Nav Login", async () => {
        await homePage.menuLoginnav.click();
        await expect(homePage.page).toHaveURL(/.*account\/login/); 
    });
    test("Nav Create Account", async () => {
        await homePage.menuCreateAccountnav.click();
        await expect(homePage.page).toHaveURL(/.*account\/register/);   
    });
    test("Nav My Cart", async () => {
        await homePage.myCartLink.click();
        await expect(homePage.page.locator('div').nth(3)).toBeVisible();
    });
    test("Nav Checkout", async () => {
        await homePage.checkoutLink.click();
        await expect(homePage.page).toHaveURL(/.*cart/); 
    });
});

test.describe("Footer Tests", () => {
    let homePage: HomePage;
    let homePageNavigation: HomePageNavigation;
    
    test.beforeEach(async ({ page }) => {  
        homePage = new HomePage(page);
        homePageNavigation = new HomePageNavigation(homePage);
         await homePageNavigation.navigateToHomePage();
    });

    test("Footer Search", async () => {
        await homePage.footerSearchLink.click();
        await expect(homePage.page).toHaveURL(/.*search/); 
    });
    test("Footer About Us", async () => {
        await homePage.footerAboutUsLink.click();
        await expect(homePage.page).toHaveURL(/.*about-us/); 
    });
});