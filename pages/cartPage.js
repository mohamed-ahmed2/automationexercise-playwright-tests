import { expect } from '@playwright/test'
export class CartPage{
  /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page){
    this.page = page
    // the following 2 locators are just for testing and they need enhancements to be dynamic locators
    this.productname = page.locator('h4:first-child')
    this.price = page.locator("td[class='cart_price']>p")
    this.quantity = page.locator("td[class='cart_quantity']>button")
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout')
    this.registerLoginButton = page.getByRole('link').filter({hasText:'Register / Login'})
    this.placeOrderButton = page.getByText('Place Orde')
    this.totalAmount = page.locator('p.cart_total_price').last()
    this.nameOnCardBox = page.locator('//input[@name="name_on_card"]')
    this.cardNumberBox = page.locator('//input[@name="card_number"]')
    this.cvcBox = page.locator('//input[@name="cvc"]')
    this.expiryMonthBox = page.locator('//input[@name="expiry_month"]')
    this.expiryYearBox = page.locator('//input[@name="expiry_year"]')
    this.payAndConfirmOrderButton = page.locator('#submit')
    this.sucessMessage = page.getByText('Congratulations! Your order has been confirmed!')
    this.confirmationmessage = page.locator('#success_message')
      // to be edited
    this.remove_item = page.locator('.cart_quantity_delete') 
    // text to be edited
    this.item = page.getByText('Blue Top')
    
    //delete account from cart page
    this.deleteAccountButton = page.getByText('Delete Account')
    this.deleteConfirmationText = page.getByText('ACCOUNT DELETED!')
    
    
    //delivery address fields 
      this.deliveryAddress = page.locator('#address_delivery')
      this.addressField1 = this.deliveryAddress.locator('li.address_address1.address_address2').nth(1)
      
    // continue in delete account
    this.continueButton = page.locator("[data-qa='continue-button']")
    //download invoice 
    this.downloadInvoiceButton = page.getByText('Download Invoice')
  }

async enterCardDetailsAndSubmitPayment(nameOnCard,numberOnCard,cvc,expiryMonth,expiryYear){
  await this.nameOnCardBox.fill(nameOnCard)
  await this.cardNumberBox.fill(numberOnCard)
  await this.cvcBox.fill(cvc)
  await this.expiryMonthBox.fill(expiryMonth)
  await this.expiryYearBox.fill(expiryYear)
  await this.payAndConfirmOrderButton.click() 
}

async clickonProceedToCheckout(){
  await this.proceedToCheckoutButton.click()
}


async clickOnContinue(){
  await this.continueButton.click()
}

// this function takes the path to stores the invoice at as the first parameter
async clickOnDownloadInvoice(){
  const downloadPromise = this.page.waitForEvent('download');
  await this.downloadInvoiceButton.click()
  const download = await downloadPromise;
 // Wait for the download process to complete and save the downloaded file somewhere.
 await download.saveAs('./downloads/' + download.suggestedFilename());
 return download
 

}


}

