import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import {contactUsPage} from '../pages/contactUsPage';



test('verify GET IN TOUCH',async({page})=>{
    const  homePage = new HomePage(page)
      await homePage.navigateToHome()
      await homePage.handleCookiesPopup()
      await homePage.clickOnContactUs()
      const contactuspage = new contactUsPage(page)
      await expect(contactuspage.getInTouchText).toBeVisible()
      await contactuspage.enterNameContactUs('Name')
      await contactuspage.enterEmailContactUs('test@tekkkst.com')
      await contactuspage.enterSubjectContactUs('subject test')
      await contactuspage.enterMessageContactUs('Message teeeeet')
      await contactuspage.uploadDocumentContactUs('Error.png')
      //contactuspage.ConfirmAlert()
     // page.waitForLoadState('networkidle')     
      page.on('dialog', async dialog=> dialog.accept())
      await contactuspage.clickSubmitContactUs() 
    await expect(contactuspage.successMessage_contactUs).not.toHaveText('Success! Your details have been submitted successfully.')
  })


 