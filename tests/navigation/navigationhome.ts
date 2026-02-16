import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
 

 
export class HomePageNavigation {
   
  public homePage: HomePage;
  
  constructor(homePage: HomePage) {
    this.homePage = homePage;
  }


//navigaticq do saita
  async navigateToHomePage() {
    await this.homePage.page.goto("https://sauce-demo.myshopify.com/");
  }

  //navigacia do Catalog
  async navigateToCatalog() {
    await this.homePage.menuCatalog.click();
    await expect(this.homePage.page).toHaveURL(/.*collections/);
  }
  //navigacia do Blog
  async navigateToBlog() {
    await this.homePage.menuBlog.click();
    await expect(this.homePage.page).toHaveURL(/.*blog/);
  }
  //navigacia do About Us
  async navigateToAboutUs() {
    await this.homePage.menuAboutUs.click();
    await expect(this.homePage.page).toHaveURL(/.*about-us/);
  } 
  //navigacia do Wish List
  async navigateToWishList() {
    await this.homePage.menuWishList.click();
    await expect(this.homePage.page).toHaveURL(/.*wish-list/);
  }
  //navigacia do Refer A Friend
  async navigateToReferAFriend() {
    await this.homePage.menuReferAFriend.click();
    await expect(this.homePage.page).toHaveURL(/.*#sauce-show-refer-friend/);
  }
  //navigacia do Social
  async navigateToSocial() {
    await this.homePage.menuSocial.isVisible();   
  }
  //navigacia do login
  async navigateToLogin() {
    await this.homePage.menuLoginnav.click();
    await expect(this.homePage.page).toHaveURL(/.*account\/login/);
  }
  //navigacia do create account
  async navigateToCreateAccount() {
    await this.homePage.menuCreateAccountnav.click();
    await expect(this.homePage.page).toHaveURL(/.*account\/register/);
  }
}