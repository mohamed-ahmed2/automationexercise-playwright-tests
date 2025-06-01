const { test, expect } = require('@playwright/test');
const {HomePage} = require('../pages/homePage');

test('test that subscription confirmation message is visible ',async ({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.enterEmailInSubscriptionBox('testing@emial.com')
    await homePage.clickonSubscribeButton()
    await expect(homePage.subscriptionMessage).toBeVisible()
})

test('test that subscription confirmation message is visible in Cart ',async ({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.clickOnCart()
    await homePage.enterEmailInSubscriptionBox('testing@emial.com')
    await homePage.clickonSubscribeButton()
    await expect(homePage.subscriptionMessage).toBeVisible()
})


test('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality',async({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.subscribeButton.scrollIntoViewIfNeeded()
    await expect(homePage.subscriptionHeader).toBeInViewport()
    await homePage.topArrowButton.click()
    await expect(homePage.descriptionText).toBeInViewport()

})

test('Test Case 25: Verify Scroll Up without using Arrow button and Scroll Down functionality',async({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.subscribeButton.scrollIntoViewIfNeeded()
    await expect(homePage.subscriptionHeader).toBeInViewport()
    await homePage.descriptionText.scrollIntoViewIfNeeded()
    await expect(homePage.descriptionText).toBeInViewport()

})
