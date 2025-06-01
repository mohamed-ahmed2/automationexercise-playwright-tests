const { test, expect } = require('@playwright/test');
const {SignupPage} = require('../pages/signupPage');
const {HomePage} = require('../pages/homePage');
const {ProductPage} = require('../pages/product');
const {ProductDetailPage} = require('../pages/productDetailPage');

test('test that all products are visible',async ({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.clickonProducts()
    const productPage = new ProductPage(page)
    await expect(productPage.page).toHaveURL('https://automationexercise.com/products')
    await expect(productPage.productsList).toBeVisible()
    //await expect(productPage.viewProductButton.first()).toBeVisible()
    await productPage.viewProductButton.first().click()
    const productDetailPage = new ProductDetailPage(page)
    await expect(productDetailPage.productName).toContainText('Blue Top')
    await expect(productDetailPage.category).toContainText('Women > Tops')
    await expect(productDetailPage.price).toContainText('500')
    await expect(productDetailPage.availability).toContainText('In Stock')
    await expect(productDetailPage.condition).toContainText('New')
    await expect(productDetailPage.brand).toContainText('Polo')
})

test('test that search product is working',async ({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.clickonProducts()
    const productPage = new ProductPage(page)
    await expect(productPage.page).toHaveURL('https://automationexercise.com/products')
    await expect(productPage.productsList).toBeVisible()
    await productPage.searchProduct('Tshirt')
    await expect(productPage.searchedProducts).toBeVisible()
    for(const product of await productPage.productInfo.all()){
         console.log(await product.textContent())
         await expect(product).toContainText('shirt',{ignoreCase:true})
        }
})

test('Test Case 21: Add review on product',async({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.clickonProducts()
    const productPage = new ProductPage(page)
    await expect(productPage.page).toHaveURL('https://automationexercise.com/products')
    await expect(productPage.productsList).toBeVisible()
    await productPage.viewproduct('Men Tshirt') // clicking on the product with the name passed to the func
    await expect(productPage.writeYourReview).toBeVisible()
    await productPage.addReview('testing user','emaiiil@test.com','very good product')
    await expect(productPage.review_message).toBeVisible()
})