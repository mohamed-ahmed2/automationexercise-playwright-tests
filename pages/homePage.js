import { expect } from '@playwright/test'


export class HomePage{
  /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page){
    this.page = page
    this.signUpButton = page.locator('a:has-text("Signup / Login")')
    this.homePageUrl = "https://automationexercise.com/" 
    this.emailBox = page.locator("[data-qa='login-email']")
    this.passwordBox = page.locator("[data-qa='login-password']")
    this.loginButton = page.locator("[data-qa='login-button']")
    this.userNameText = page.locator(".nav.navbar-nav li:last-child b")
    this.deleteAccountButton = page.getByText('Delete Account')
    this.deleteConfirmationText = page.getByText('ACCOUNT DELETED!')
    this.continueButton = page.locator("[data-qa='continue-button']")
    this.errorMessage = page.getByText('Your email or password is incorrect!')
    this.loginHeading = page.getByRole('heading',{name:'Login to your account'})
    this.logoutButton = page.getByText('Logout',{exact:true})
    this.contactUsButton = page.getByText('Contact us',{exact:false}) 
    this.testCasesButton = page.getByRole('link',{name:'Test Cases'}).first()         
    //handle cookies
    this.manageOptionsButton = page.getByText('Manage options')
    this.confirmChoicesButton = page.getByRole('button', { name: 'Confirm choices' })    
        //
    this.subscribeEmailBox = page.locator('#susbscribe_email')  
    this.productsButton = page.getByRole('link',{name:'Products'})
    this.subscribeButton = page.locator('#subscribe')  
    this.subscriptionMessage = page.getByText('You have been successfully subscribed')
    this.cartButton = page.getByRole('link').filter({hasText:'Cart'})
    this.addedPopup = page.locator("//h4[normalize-space()='Added!']")
    this.viewCartButton = page.locator("//u[normalize-space()='View Cart']")
  this.addToCartButton = page.locator("//div[@Class='productinfo text-center']/a")
   // Subscription header
   this.subscriptionHeader = page.getByRole('heading',{name:'Subscription'})   

   // top arrow
   this.topArrowButton = page.locator('#scrollUp')

   //description text 
   this.descriptionText = page.getByRole('heading',{name:'Full-Fledged practice website for Automation Engineers'})
}


async navigateToHome(){
  await  this.page.goto(this.homePageUrl)
}

async clickOnSignup(){
  await  this.signUpButton.click()
}

async login(email,password){

  await this.emailBox.fill(email)
  await this.passwordBox.fill(password)
  await this.loginButton.click()
}
async clickOnContinue(){
  await this.continueButton.click()
}
async clickOnContactUs(){
  await this.contactUsButton.click()
}

async clickonTestCases(){
  await this.testCasesButton.click()
}
async handleCookiesPopup(){
  //aria-label="Manage options"
  //Confirm choices
await this.manageOptionsButton.click()
await this.confirmChoicesButton.click()
}

async clickonProducts(){
  await this.productsButton.click()
}
async enterEmailInSubscriptionBox(email){
await this.subscribeEmailBox.fill(email)
}
async clickonSubscribeButton(){
await this.subscribeButton.click()
}

async clickOnCart(){
  await this.cartButton.click()
  }
  
  async addTocartFromRecommendedItems(){
  //const targetSlide = this.page.locator('div.item.active:has-text("Stylish Dress")');
  await this.page.locator('#recommended-item-carousel').scrollIntoViewIfNeeded()
  const element = this.page.locator('#recommended-item-carousel').locator('div.single-products',{hasText:'Men Tshirt'})
  await element.getByText('Add to cart').click()
  }  

  async addTocart(product_name){
    //const targetSlide = this.page.locator('div.item.active:has-text("Stylish Dress")');
    const item = this.page.locator('.features_items').locator('div.productinfo.text-center',{hasText:product_name})
    await item.locator('a',{hasText:'Add to cart'}).click()
    }
  

}

