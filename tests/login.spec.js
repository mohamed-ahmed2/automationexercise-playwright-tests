import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SignupPage } from '../pages/signupPage';


test('valid login',async({page})=>{
    const  homePage = new HomePage(page)
      await homePage.navigateToHome()
      await homePage.clickOnSignup()
      await homePage.login("email@testingteam.com","password")
      await expect(homePage.userNameText).toBeVisible()
      
  })
  
      
  test('invalid login',async({page})=>{
      const homePage = new HomePage(page)
      await page.goto(homePage.homePageUrl)
      //await homePage.navigateToHome()
      await homePage.clickOnSignup()
      await homePage.login('invalid@test.com','tetett')
      await expect(homePage.errorMessage).toBeVisible()
  })
  
  test('logout test',async({page})=>{
    const homePage = new HomePage(page)
      await page.goto(homePage.homePageUrl)
      //await homePage.navigateToHome()
      await homePage.clickOnSignup()
      await homePage.login('email@testingteam.com','password')
      // user is now logged in 
      //await expect(homePage.userNameText).toHaveText('name')
      expect(page.getByText(' Logged in as name',{exact:false})).toBeVisible()
      await page.pause()
      await homePage.logoutButton.click()
      //user is now logged out
      await expect(homePage.loginHeading).toBeVisible()
  })