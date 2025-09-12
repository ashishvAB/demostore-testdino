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

async function login1(username = process.env.USERNAME1, password = process.env.PASSWORD) {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.validateSignInPage();
  await allPages.loginPage.login(username, password);
}

async function logout() {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.clickOnLogoutButton();
}



test('Verify that User Can Add, Edit, and Delete Addresses after Logging In', async () => {
    await login();

  await test.step('Verify that user is able to add address successfully', async () => {
    await allPages.userPage.clickOnUserProfileIcon();
    await allPages.userPage.clickOnAddressTab();
    await allPages.userPage.clickOnAddAddressButton();
    await allPages.userPage.fillAddressForm();
    await allPages.userPage.verifytheAddressIsAdded();
  });

  await test.step('Verify that user is able to edit address successfully', async () => {
    await allPages.userPage.clickOnEditAddressButton();
    await allPages.userPage.updateAddressForm();
    await allPages.userPage.verifytheUpdatedAddressIsAdded();
  })

  await test.step('Verify that user is able to delete address successfully', async () => {
    await allPages.userPage.clickOnDeleteAddressButton();
  });
});


test('Verify that the New User is able to add Addresses in the Address section', async () => {
  await login();
  await allPages.userPage.clickOnUserProfileIcon();
  await allPages.userPage.clickOnAddressTab();
  await allPages.userPage.clickOnAddAddressButton();
  await allPages.userPage.checkAddNewAddressMenu();
  await allPages.userPage.fillAddressForm();
});

// test('Verify that User Can Complete the Journey from Login to Order Placement', async () => {
//   const productName = 'GoPro HERO10 Black';
//   await login();
//   await allPages.inventoryPage.clickOnShopNowButton();
//   await allPages.inventoryPage.clickOnAllProductsLink();
//   await allPages.inventoryPage.searchProduct(productName);
//   await allPages.inventoryPage.verifyProductTitleVisible(productName);
//   await allPages.inventoryPage.clickOnAddToCartIcon();

//   await allPages.cartPage.clickOnCartIcon();
//   await allPages.cartPage.verifyCartItemVisible(productName);
//   await allPages.cartPage.clickOnCheckoutButton();
//   await allPages.checkoutPage.verifyCheckoutTitle();
//   await allPages.checkoutPage.verifyProductInCheckout(productName);
//   await allPages.checkoutPage.selectCashOnDelivery();
//   await allPages.checkoutPage.verifyCashOnDeliverySelected();
//   await allPages.checkoutPage.clickOnPlaceOrder();
//   await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
// });

// test('Verify user can place and cancel an order', async () => {
//   const productName = 'GoPro HERO10 Black';
//   const productPriceAndQuantity = '₹49,999 × 1';
//   const productQuantity = '1';
//   const orderStatusProcessing = 'Processing';
//   const orderStatusCanceled = 'Canceled';

//   await test.step('Verify that user can login successfully', async () => {
//     await login();
//     await allPages.inventoryPage.clickOnAllProductsLink();
//     await allPages.inventoryPage.searchProduct(productName);
//     await allPages.inventoryPage.verifyProductTitleVisible(productName);
//     await allPages.inventoryPage.clickOnAddToCartIcon();
//   })

//   await test.step('Add product to cart and checkout', async () => {
//    await allPages.cartPage.clickOnCartIcon();
//     await allPages.cartPage.verifyCartItemVisible(productName);
//     await allPages.cartPage.clickOnCheckoutButton();
//   })

//   await test.step('Place order and click on continue shopping', async () => {
//     await allPages.checkoutPage.verifyCheckoutTitle();
//     await allPages.checkoutPage.verifyProductInCheckout(productName);
//     await allPages.checkoutPage.selectCashOnDelivery();
//     await allPages.checkoutPage.verifyCashOnDeliverySelected();
//     await allPages.checkoutPage.clickOnPlaceOrder();
//     await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
//     await allPages.checkoutPage.verifyOrderItemName(productName);
//     await allPages.inventoryPage.clickOnContinueShopping();
//   })

//   await test.step('Verify order in My Orders', async () => {
//     await allPages.loginPage.clickOnUserProfileIcon();
//     await allPages.orderPage.clickOnMyOrdersTab();
//     await allPages.orderPage.verifyMyOrdersTitle();
//     await allPages.orderPage.clickOnPaginationButton(2);
//     await allPages.orderPage.verifyProductInOrderList(productName);
//     await allPages.orderPage.verifyPriceAndQuantityInOrderList(productPriceAndQuantity);
//     await allPages.orderPage.verifyOrderStatusInList(orderStatusProcessing, productName);
//     await allPages.orderPage.clickOnPaginationButton(1);
//     await allPages.orderPage.clickViewDetailsButton(1);
//     await allPages.orderPage.verifyOrderDetailsTitle();
//     await allPages.orderPage.verifyOrderSummary(productName, productQuantity, '₹49,999', orderStatusProcessing);
//   })

//   await test.step('Cancel order and verify status is updated to Canceled', async () => {
//     await allPages.orderPage.clickCancelOrderButton(2);
//     await allPages.orderPage.confirmCancellation();
//     await allPages.orderPage.verifyCancellationConfirmationMessage();
//     await allPages.orderPage.verifyMyOrdersCount();
//     await allPages.orderPage.clickOnMyOrdersTab();
//     await allPages.orderPage.verifyMyOrdersTitle();
//     await allPages.orderPage.clickOnPaginationButton(2);
//     await allPages.orderPage.verifyOrderStatusInList(orderStatusCanceled, productName);
//   })
// });


test('Verify that user can filter products by price range', async () => {
    await login();
    await allPages.homePage.clickOnShopNowButton();
    await allPages.homePage.clickOnFilterButton();
    await allPages.homePage.AdjustPriceRangeSlider('10000', '20000');
    await allPages.homePage.clickOnFilterButton();
});

// test('Verify if user can add product to wishlist, moves it to card and then checks out', async () => {
//     await login();
  
//     await test.step('Add product to wishlistand then add to cart', async () => {
//       await allPages.homePage.clickOnShopNowButton();
//       await allPages.inventoryPage.addToWishlist();
//       await allPages.inventoryPage.assertWishlistIcon();
//       await allPages.inventoryPage.clickOnWishlistIconHeader();
//       await allPages.inventoryPage.assertWishlistPage();
//       await allPages.inventoryPage.clickOnWishlistAddToCard();
//     })
  
//     await test.step('Checkout product added to cart', async () => {
//       await allPages.cartPage.clickOnCartIcon();
//       await allPages.cartPage.clickOnCheckoutButton();
//       await allPages.checkoutPage.verifyCheckoutTitle();
//       await allPages.checkoutPage.selectCashOnDelivery();
//       await allPages.checkoutPage.verifyCashOnDeliverySelected();
//       await allPages.checkoutPage.clickOnPlaceOrder();
//       await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
//     })
  
// });

// test('Verify new user views and cancels an order in my orders', async () => {
//     const email = `test+${Date.now()}@test.com`;
//     const firstName = 'Test';
//     const lastName = 'User';

//     let productName= `Rode NT1-A Condenser Mic`;

//   await test.step('Verify that user can register successfully', async () => {
//     await allPages.loginPage.clickOnUserProfileIcon();
//     await allPages.loginPage.validateSignInPage();
//     await allPages.loginPage.clickOnSignupLink();
//     await allPages.signupPage.assertSignupPage();
//     await allPages.signupPage.signup(firstName, lastName, email, process.env.PASSWORD);
//     await allPages.signupPage.verifySuccessSignUp();
//   })

//   await test.step('Verify that user can login successfully', async () => {
//     await allPages.loginPage.validateSignInPage();
//     await allPages.loginPage.login(email, process.env.PASSWORD);
//     await allPages.loginPage.verifySuccessSignIn();
//     await expect(allPages.homePage.getHomeNav()).toBeVisible({ timeout: 30000 });
//   })

//   await test.step('Navigate to All Products and add view details of a random product', async () => {
//     await allPages.homePage.clickAllProductsNav();
//     await allPages.allProductsPage.assertAllProductsTitle();
//     productName = await allPages.allProductsPage.getNthProductName(1);
//     await allPages.allProductsPage.clickNthProduct(1);
//     await allPages.productDetailsPage.clickAddToCartButton();
//   })

//   await test.step('Add product to cart, add new address and checkout', async () => {
//     await allPages.productDetailsPage.clickCartIcon();
//     await allPages.cartPage.assertYourCartTitle();
//     await expect(allPages.cartPage.getCartItemName()).toContainText(productName, { timeout: 10000 });
//     await allPages.cartPage.clickOnCheckoutButton();
//     await allPages.checkoutPage.verifyCheckoutTitle();
//     await allPages.checkoutPage.fillShippingAddress(
//       firstName, email, 'New York', 'New York', '123 Main St', '10001', 'United States'
//     );
//     await allPages.checkoutPage.clickSaveAddressButton();
//     await allPages.checkoutPage.assertAddressAddedToast();
//   })

//   await test.step('Complete order and verify in my orders', async () => {
//     await allPages.checkoutPage.selectCashOnDelivery();
//     await allPages.checkoutPage.verifyCheckoutTitle();
//     await allPages.checkoutPage.clickOnPlaceOrder();
//     await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
//     await allPages.inventoryPage.clickOnContinueShopping();

//     await allPages.loginPage.clickOnUserProfileIcon();
//     await allPages.orderPage.clickOnMyOrdersTab();
//     await allPages.orderPage.clickCancelOrderButton();
//     await allPages.orderPage.confirmCancellation();
//   });
// });


