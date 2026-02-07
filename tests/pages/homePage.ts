import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  // main nav links
  readonly menuHome: Locator;
  readonly menuCatalog: Locator;
  readonly menuBlog: Locator;
  readonly menuAboutUs: Locator;
  readonly menuWishList: Locator;
  readonly menuReferAFriend: Locator; 
  readonly menuSocial: Locator;
  readonly FacebookLink: Locator;
  readonly TwitterLink: Locator
  readonly InstagramLink: Locator;
  readonly PinterestLink: Locator;
  readonly newslinkdownload: Locator;


  // nav
  readonly menuSearchnav: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
  readonly SearchLinknav: Locator;
  readonly menuAboutUsnav: Locator;
  readonly menuLoginnav: Locator;
  readonly menuCreateAccountnav: Locator;
  
  


  // Cart
  readonly myCartLink: Locator;
  readonly checkoutLink: Locator;

  // Footer
  /* readonly footer: Locator;
  readonly footerSearchLink: Locator;
  readonly footerAboutUsLink: Locator; */


  constructor(page: Page) {
    this.page = page;

    // Main  links
    this.menuHome = page.getByRole('link', { name: 'Home' })
    this.menuCatalog = page.getByRole('link', { name: 'Catalog'})
    this.menuBlog = page.getByRole('link', { name: 'Blog', exact: true })
    this.menuAboutUs= page.locator('#main-menu').getByRole('link', { name: 'About Us' })
    this.menuWishList = page.getByRole('link', { name: 'Wish list' })
    this.menuReferAFriend = page.getByRole('link', { name: 'Refer a friend' })
    this.menuSocial = page.locator('#social')


    // nav gore
    this.menuSearchnav = page.locator('#product-search')
      this.searchInput = page.getByRole('textbox', { name: 'Search' })
      this.searchButton = page.getByRole('button', { name: 'Submit' })
    
    this.SearchLinknav = page.getByRole('banner').getByRole('link', { name: 'Search' })
    this.menuAboutUsnav = page.getByRole('banner').getByRole('link', { name: 'About Us' })
    this.menuLoginnav = page.getByRole('link', { name: 'Log In' })
    this.menuCreateAccountnav = page.getByRole('link', { name: 'Sign up' })
    // Cart
    this.myCartLink = page.getByRole('link', { name: 'My Cart (0)' })
    this.checkoutLink = page.getByRole('link', { name: 'Check Out' })

    // Footer
    /* this.footer = footer;
    this.footerSearchLink = footer.getByRole('link', { name: 'Search' }).nth(1)
    this.footerAboutUsLink = footer.getByRole('link', { name: 'About Us' }).nth(2)
   */
  this.FacebookLink = page.locator('#social').getByRole('link').filter({ hasText: /^$/ }).first();
  this.TwitterLink = page.locator('#social').getByRole('link').filter({ hasText: /^$/ }).nth(1);
  this.InstagramLink = page.locator('#social').getByRole('link').filter({ hasText: /^$/ }).nth(2);
  this.PinterestLink = page.locator('#social').getByRole('link').filter({ hasText: /^$/ }).nth(3);
  this.newslinkdownload = page.getByRole('link').filter({ hasText: /^$/ }).nth(4)
  

}



  /* async navigateToBlog() {
    await expect(this.menuBlog).toBeVisible();
    await this.menuBlog.click();
    await expect(this.page).toHaveURL(/.*blog/);
  } */

//await page.getByRole('link', { name: 'Blog' }).click();
//await page.getByRole('link', { name: 'First Post' }).click();


} 
