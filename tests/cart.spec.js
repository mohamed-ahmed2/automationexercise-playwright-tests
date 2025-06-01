const { test, expect } = require('@playwright/test');
const {HomePage} = require('../pages/homePage');
const {CartPage} = require('../pages/cartPage')
const {ProductPage} = require('../pages/product');
const{SignupPage} = require('../pages/signupPage');
test('verify that items are added to the cart ',async ({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.productsButton.click()
    const productPage = new ProductPage(page)
    await productPage.prodcut.first().hover()
    await productPage.addToCartButton.first().click()
    await expect(productPage.addedPopup).toBeVisible()
    await productPage.continueShoppingButton.click()
    await productPage.prodcut.nth(1).hover()  // hover over the seccond item
    await productPage.addToCartButton.nth(1).click() // click on the second item
    await expect(productPage.addedPopup).toBeVisible()
    await productPage.viewCartButton.click()
    const cartPage = new CartPage(page)
    // verify products name
    await expect(cartPage.productname.first()).toContainText('Blue Top')
    await expect(cartPage.productname.nth(1)).toContainText('Men Tshirt')
    //verify products price
    await expect(cartPage.price.first()).toContainText('Rs. 500')
    await expect(cartPage.price.nth(1)).toContainText('Rs. 400')

})

test('verify quantity',async ({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.productsButton.click()
    const productPage = new ProductPage(page)
    // verify Quantity of the first item  - quantity should be 4
    var quantity =0
    while(quantity < 4){
        
    await productPage.addToCartButton.nth(0).click()
    await expect(productPage.addedPopup).toBeVisible()
    quantity = quantity + 1
    if (quantity == 4){
        await productPage.viewCartButton.click()
    }
    else {
        await productPage.continueShoppingButton.click()
    }
    
        
}
    
    const cartPage = new CartPage(page)
    await expect(cartPage.quantity.first()).toContainText('4')
   
})

test('verify registering while checkout',async ({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.productsButton.click()
    const productPage = new ProductPage(page)
    await productPage.addToCartButton.nth(0).click()
    await expect(productPage.addedPopup).toBeVisible()
    await productPage.viewCartButton.click()
    const cartPage = new CartPage(page)
    await cartPage.proceedToCheckoutButton.click()
    await cartPage.registerLoginButton.click()
    const signupPage = new SignupPage(page)
    await signupPage.signup("valid signup","email@testingteamtest0021.com")
    await signupPage.fillDetails('testpass123#','testing','lastname','company name','address1','ottawa','123','45885','Montreal')
    await signupPage.submitform()
    await expect(signupPage.accountCreated).toHaveText("ACCOUNT CREATED!",{ignoreCase:true})
    await homePage.clickOnContinue()
    await expect(homePage.userNameText).toHaveText("valid signup")
    await homePage.clickOnCart()
    cartPage.proceedToCheckoutButton.click()
    await expect(cartPage.totalAmount).toContainText('500')
    await expect(cartPage.placeOrderButton).toBeVisible()
    await cartPage.placeOrderButton.click()
    await cartPage.enterCardDetailsAndSubmitPayment('testing','12333333','425','02','2027')
    await expect(cartPage.sucessMessage).toBeVisible()
    await homePage.deleteAccountButton.click()
    await expect(homePage.deleteConfirmationText).toBeVisible()  

})

test('Remove products from Cart',async ({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.productsButton.click()
    const productPage = new ProductPage(page)
    await productPage.addToCartButton.nth(0).click()
    await expect(productPage.addedPopup).toBeVisible()
    await productPage.viewCartButton.click()
    const cartPage = new CartPage(page) 
    await cartPage.remove_item.click()
    await expect(cartPage.item).not.toBeAttached()
})

test('Test Case 18: View Category Products',async({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.productsButton.click()
    const productPage = new ProductPage(page)
    await productPage.women_category.click()
    await productPage.dress_subCategory.click()
    await expect(productPage.title_WomenDressProducts).toBeVisible()
    await productPage.men_category.click()
    await productPage.jeans_subCategory.click()
    await expect(productPage.title_MenJeansProducts).toBeVisible()
})

test('Test Case 22: Add to cart from Recommended items',async({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.addTocartFromRecommendedItems()
    await expect(homePage.addedPopup).toBeVisible()
    await homePage.viewCartButton.click()
    const cartPage = new CartPage(page) 
    await expect(cartPage.productname).toContainText('Men Tshirt')

})

test('Test Case 23: Verify address details in checkout page',async({page})=>{
    const homePage = new HomePage(page)
    const signuppage = new SignupPage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.clickOnSignup()
    await expect(signuppage.newUserText).toBeVisible()
    await signuppage.signup("Test123","testing_momo1@test.com")
    await expect.soft(signuppage.signupForm).toBeVisible() 
    console.log(page.url())
    await signuppage.fillDetails('Test123456*','Testing new user','Last name','Company name','Address test','Ontario','M548','1552558','Victoria') 
    await signuppage.submitform()
    await expect(signuppage.accountCreated).toHaveText("ACCOUNT CREATED!",{ignoreCase:true})
    await homePage.clickOnContinue()
    await expect(homePage.userNameText).toHaveText("Test123")
    //await homePage.addToCartButton.nth(1).click()
    await homePage.addTocart('Men Tshirt')
    await expect(homePage.addedPopup).toBeVisible()
    await homePage.viewCartButton.click()
    const cartPage = new CartPage(page)
    await expect(cartPage.productname).toContainText('Men Tshirt')  
    await cartPage.clickonProceedToCheckout()
    await expect(cartPage.addressField1).toHaveText('Address test')
    await cartPage.deleteAccountButton.click()
    await expect(cartPage.deleteConfirmationText).toBeVisible()
    await cartPage.clickOnContinue()
}
)

test('Test Case 24: Download Invoice after purchase order',async({page})=>{
    const homePage = new HomePage(page)
    const signuppage = new SignupPage(page)
    await homePage.navigateToHome()
    await homePage.handleCookiesPopup()
    await homePage.clickOnSignup()
    await expect(signuppage.newUserText).toBeVisible()
    await signuppage.signup("Test123","testing_momo1@test.com")
    await expect.soft(signuppage.signupForm).toBeVisible() 
    console.log(page.url())
    await signuppage.fillDetails('Test123456*','Testing new user','Last name','Company name','Address test','Ontario','M548','1552558','Victoria') 
    await signuppage.submitform()
    await expect(signuppage.accountCreated).toHaveText("ACCOUNT CREATED!",{ignoreCase:true})
    await homePage.clickOnContinue()
    await expect(homePage.userNameText).toHaveText("Test123")
    await homePage.addTocart('Men Tshirt')
    await expect(homePage.addedPopup).toBeVisible()
    await homePage.viewCartButton.click()
    const cartPage = new CartPage(page)
    await expect(cartPage.productname).toContainText('Men Tshirt')  
    await cartPage.clickonProceedToCheckout()
    await expect(cartPage.addressField1).toHaveText('Address test')
    //await cartPage.clickOnContinue()
    await cartPage.placeOrderButton.click()
    await cartPage.enterCardDetailsAndSubmitPayment('testing','12333333','425','02','2027')
    await expect(cartPage.sucessMessage).toBeVisible()
    const downloaded_file = await cartPage.clickOnDownloadInvoice()    
    // assert that the file is stored correctly - will fail if the path is null
    const downlodedFile_path = await downloaded_file.path()
    expect(downlodedFile_path).toBeTruthy()
    console.log(downlodedFile_path)
    await homePage.deleteAccountButton.click()
    await expect(homePage.deleteConfirmationText).toBeVisible() 
    

})