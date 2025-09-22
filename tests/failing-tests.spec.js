// @ts-check
import { expect, test } from '@playwright/test';
import AllPages from '../pages/AllPages.js';
import dotenv from 'dotenv';
dotenv.config({ override: true });

let allPages;

test.beforeEach(async ({ page }) => {
  allPages = new AllPages(page);
  await page.goto('/');
});

async function login(username = process.env.USERNAME, password = process.env.PASSWORD) {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.validateSignInPage();
  await allPages.loginPage.login(username, password);
}

test('Verify that user can login and logout successfully', async () => {
  await login();
  // This will fail - expecting wrong element
  await expect(allPages.homePage.getHomeNav()).toHaveText('Wrong Navigation Text');
});

test('Verify that user can update personal information', async () => {
  await login();
  await allPages.userPage.clickOnUserProfileIcon();
  // This will fail - expecting wrong text
  await expect(allPages.userPage.getUserProfileTitle()).toHaveText('Wrong Profile Title');
});

test('Verify that User Can Add Address after Logging In', async () => {
  await login();
  await allPages.userPage.clickOnUserProfileIcon();
  await allPages.userPage.clickOnAddressTab();
  await allPages.userPage.clickOnAddAddressButton();
  // This will fail - expecting wrong success message
  await expect(allPages.userPage.getAddressSuccessMessage()).toHaveText('Wrong Success Message');
});

test('Verify that user can change password successfully', async () => {
  await login();
  await allPages.userPage.clickOnUserProfileIcon();
  await allPages.userPage.clickOnSecurityButton();
  // This will fail - expecting wrong notification text
  await expect(allPages.userPage.getUpdatePasswordNotification()).toHaveText('Wrong Password Update Message');
});

test('Verify that the New User is able to add Addresses', async () => {
  await login();
  await allPages.userPage.clickOnUserProfileIcon();
  await allPages.userPage.clickOnAddressTab();
  await allPages.userPage.clickOnAddAddressButton();
  // This will fail - expecting wrong menu text
  await expect(allPages.userPage.getAddNewAddressMenu()).toHaveText('Wrong Menu Text');
});

test('Verify that User Can Complete Login to Order Placement', async () => {
  await login();
  await allPages.inventoryPage.clickOnShopNowButton();
  // This will fail - expecting wrong product title
  await expect(allPages.inventoryPage.getProductTitle()).toHaveText('Wrong Product Title');
});

test('Verify user can place an order', async () => {
  await login();
  await allPages.inventoryPage.clickOnShopNowButton();
  // This will fail - expecting wrong product visibility
  await expect(allPages.inventoryPage.getProductTitle()).toBeHidden();
});

test('Verify that a New User Can Register Successfully', async () => {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.validateSignInPage();
  await allPages.loginPage.clickOnSignupLink();
  // This will fail - expecting wrong signup page title
  await expect(allPages.signupPage.getSignupPageTitle()).toHaveText('Wrong Signup Title');
});

test('Verify that user can filter products by price range', async () => {
  await login();
  await allPages.homePage.clickOnShopNowButton();
  await allPages.homePage.clickOnFilterButton();
  // This will fail - expecting wrong filtered results
  await expect(allPages.homePage.getFilteredProductsCount()).toHaveText('999 Products Found');
});

test('Verify that the new user is able to Sign Up and Log In', async () => {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.validateSignInPage();
  await allPages.loginPage.clickOnSignupLink();
  // This will fail - expecting wrong signup page title
  await expect(allPages.signupPage.getSignupPageTitle()).toHaveText('Wrong Signup Page Title');
});

test('Verify that user is able to fill Contact Us page', async () => {
  await login();
  await allPages.homePage.clickOnContactUsLink();
  // This will fail - expecting wrong contact us title
  await expect(allPages.contactUsPage.getContactUsTitle()).toHaveText('Wrong Contact Us Title');
});

test('Verify that user is able to submit a product review', async () => {
  await login();
  await allPages.homePage.clickOnShopNowButton();
  // This will fail - expecting wrong all products title
  await expect(allPages.allProductsPage.getAllProductsTitle()).toHaveText('Wrong All Products Title');
});

test('Verify that user can edit a product review', async () => {
  await login();
  await allPages.homePage.clickOnShopNowButton();
  // This will fail - expecting wrong all products title
  await expect(allPages.allProductsPage.getAllProductsTitle()).toHaveText('Wrong All Products Title');
});

test('Verify that all the navbar links are working properly', async () => {
  await login();
  await allPages.homePage.clickBackToHomeButton();
  // This will fail - expecting wrong home page title
  await expect(allPages.homePage.getHomePageTitle()).toHaveText('Wrong Home Page Title');
});

test('Verify cart page displays incorrect data', async () => {
  await login();
  await allPages.cartPage.clickOnCartIcon();
  // This will fail - expecting wrong cart title
  await expect(allPages.cartPage.getYourCartTitle()).toHaveText('Wrong Cart Title');
});

test('Verify checkout page shows wrong information', async () => {
  await login();
  await allPages.cartPage.clickOnCartIcon();
  await allPages.cartPage.clickOnCheckoutButton();
  // This will fail - expecting wrong checkout title
  await expect(allPages.checkoutPage.getCheckoutTitle()).toHaveText('Wrong Checkout Title');
});

test('Verify order details page has incorrect title', async () => {
  await login();
  // This will fail - expecting wrong order details title
  await expect(allPages.orderDetailsPage.getOrderDetailsTitle()).toHaveText('Wrong Order Details Title');
});

test('Verify my orders page shows wrong data', async () => {
  await login();
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.orderPage.clickOnMyOrdersTab();
  // This will fail - expecting wrong orders title
  await expect(allPages.orderPage.getMyOrdersTitle()).toHaveText('Wrong Orders Title');
});

test('Verify product details page shows wrong product name', async () => {
  await login();
  await allPages.homePage.clickOnShopNowButton();
  // This will fail - expecting wrong product name
  await expect(allPages.productDetailsPage.getProductNameTitle()).toHaveText('Wrong Product Name');
});

test('Verify wishlist count is incorrect', async () => {
  await login();
  await allPages.homePage.clickAllProductsNav();
  // This will fail - expecting wrong wishlist count
  await expect(allPages.allProductsPage.getNthProductWishlistIconCount(1)).toContainText('999');
});

test('Verify order summary shows wrong data', async () => {
  await login();
  // This will fail - expecting wrong order summary title
  await expect(allPages.checkoutPage.getOrderSummaryTitle()).toHaveText('Wrong Order Summary Title');
});

test('Verify shipping details are incorrect', async () => {
  await login();
  // This will fail - expecting wrong shipping details title
  await expect(allPages.orderDetailsPage.getShippingDetailsTitle()).toHaveText('Wrong Shipping Details Title');
});
