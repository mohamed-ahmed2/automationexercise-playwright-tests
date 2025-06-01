const { test, expect } = require('@playwright/test');
const {SignupPage} = require('../pages/signupPage');
const {HomePage} = require('../pages/homePage');


test('register new user @momo',async({page})=>{
    const homePage = new HomePage(page)
    const signuppage = new SignupPage(page)
    await homePage.navigateToHome()
    await homePage.clickOnSignup()
    await expect(signuppage.newUserText).toBeVisible()
    await signuppage.signup("Test123","testing_momo1@test.com")
    await expect.soft(signuppage.signupForm).toBeVisible() 
    console.log(page.url())
    await signuppage.fillDetails("Test123456","testing user first name","last name testing","company",
    "address test","state testing","zip code","0100000","Ontario") 
    await signuppage.submitform()
    await expect(signuppage.accountCreated).toHaveText("ACCOUNT CREATED!",{ignoreCase:true})
    await homePage.clickOnContinue()
    await expect(homePage.userNameText).toHaveText("Test123")
    await homePage.deleteAccountButton.click()
    await expect(homePage.deleteConfirmationText).toBeVisible()
    await homePage.clickOnContinue()
    await page.pause()
    
})



test.only('register user with existing email',async({page})=>{
    const signuppage = new SignupPage(page)
    await signuppage.navigateToSignup()
    await signuppage.signup("testing invalid signup","email@testingteam.com")
    await expect(signuppage.existingEmailError).toBeVisible()
    
    
         
    
    })
