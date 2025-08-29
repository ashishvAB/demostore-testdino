import BasePage from './BasePage.js';
import { expect } from '@playwright/test';

class ProductDetailsPage extends BasePage{

  /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        super(page);
        this.page = page;
    }

    locators = {
        plusIconToAddQuantity: '[aria-label="plus"]',
        totalQuantity: '[aria-label="minus"] + div',
        addToCartButton: 'ADD TO CART',
        headerCartIcon: 'header-cart-icon',
        productAdditionalInfoTab : `[data-testid="additional-info-tab"]`,
        productReviewsTab : `[data-testid="reviews-tab"]`

    }

    async assertProductNameTitle(productName) {
        await expect(this.page.locator(`//h1[text()="${productName}"]`).first()).toBeVisible();
    }

    async assertProductReviewCount(productName, productReviewCount) {
        await expect(this.page.locator(`//h1[text()="${productName}"]/following-sibling::div/p`).first()).toContainText(productReviewCount);
    }

    async assertProductPrice(productName, productPrice) {
        await expect(this.page.locator(`//h1[text()="${productName}"]/following-sibling::p[contains(@class, 'font-medium')]`).first()).toContainText(productPrice);
    }

    getPlusIconToAddQuantity() {
        return this.page.locator(this.locators.plusIconToAddQuantity)
    }

    async clickPlusIconToAddQuantity() {
        await this.getPlusIconToAddQuantity().click();
    }

    getTotalQuantity() {
        return this.page.locator(this.locators.totalQuantity)
    }

    getAddToCartButton() {
        return this.page.getByText(this.locators.addToCartButton)
    }

    getProductAdditionalInfoTab() {
        return this.page.locator(this.locators.productAdditionalInfoTab)
    }

    getProductReviewsTab() {
        return this.page.locator(this.locators.productReviewsTab)
    }

    async clickOnReviewsTab() {
        await this.getProductReviewsTab().click();
    }

    async assertReviewsTab() {
        await expect(this.getProductReviewsTab()).toBeVisible();
    }

    async clickOnAdditionalInfoTab() {
        await this.getProductAdditionalInfoTab().click();
    }

    async assertAdditionalInfoTab() {
        await expect(this.getProductAdditionalInfoTab()).toBeVisible();
    }

    async clickAddToCartButton() {
        await this.getAddToCartButton().click();
        await expect(this.page.getByText('Added to the cart')).toBeVisible();
    }

    getCartIcon() {
        return this.page.getByTestId(this.locators.headerCartIcon)
    }

    async clickCartIcon() {
        await this.getCartIcon().click();
    }
}

export default ProductDetailsPage;