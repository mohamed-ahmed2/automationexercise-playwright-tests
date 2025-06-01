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


  test('verify slider',async({page})=>{
    await page.goto('https://aqarmap.com.eg/ar/')
    //await page.getByRole('paragraph').filter({hasText:'السعر'}).click()
    const price = page.locator('div[role="button"]').nth(2)
    await price.click()
    await expect(page.getByRole('button').filter({hasText:'حفظ'})).toBeVisible()
    //await page.getByRole('slider',{name:'Upper Range'}).click()
   const upper_range = page.getByRole('slider',{name:'Upper Range'})
    const box = await upper_range.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.down()
    //await page.mouse.move(box.x+ 20, box.y + box.height / 2,{steps:10})
    //await page.mouse.up()
    const upper_value =  await page.locator('span.font-\\[400\\].text-gray__dark_2.whitespace-nowrap.text-body_2').nth(1)
    await page.mouse.up()
    const expected_price = '1.5مليون '
  
      
    var additional_pixels = 0
    while((await upper_value.textContent()) != expected_price) {
    //await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    console.log(await upper_value.textContent())
    await page.keyboard.press('ArrowRight')
    
    //await page.mouse.move(box.x+ 20, box.y + box.height / 2)
    //await page.mouse.up()
    //additional_pixels = additional_pixels + 20
    }
    await page.mouse.up()
    console.log(await upper_value.textContent())
    await page.getByRole('button').filter({hasText:'حفظ'}).click()    
  })


