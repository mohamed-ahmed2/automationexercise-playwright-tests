const {expect } = require('@playwright/test');

class SignupPage{
  /**
   * @param {import('@playwright/test').Page} page
   */
constructor(page){
this.page = page   
this.nameBox = page.locator("input[data-qa='signup-name']");
this.emailSignupBox = page.locator("input[data-qa='signup-email']");
this.signupButton = page.locator("button[data-qa='signup-button']");
this.url = "https://automationexercise.com/signup"
this.signupForm = page.locator("b:has-text('ENTER ACCOUNT INFORMATION')");
this.newUserText = page.locator("h2:has-text('New User Signup')")
this.titleMrCheckbox = page.locator("#id_gender1")
this.passwordBox = page.locator("#password")
this.daysMenu = page.locator("#days")
this.monthsMenu = page.locator("#months")
this.yearsMenu = page.locator("#years")
this.firstNameBox = page.locator("#first_name")
this.lastnameBox = page.locator("#last_name")
this.companyBox = page.locator("#company")
this.addressBox = page.locator("#address1")
this.countryMenu = page.locator("#country")
this.stateBox = page.locator("#state")
this.cityBox = page.locator("#city")
this.zipCodeBox = page.locator("#zipcode")
this.mobileNumberBox = page.locator("#mobile_number")
this.submitformButton = page.locator("button[data-qa='create-account']")
this.accountCreated = page.locator("h2[data-qa=account-created]")
this.existingEmailError = page.getByText('Email Address already exist!')
}

async navigateToSignup(){
  await  this.page.goto(this.url)

}

async signup(name,email){
    await this.nameBox.fill(name)
    await this.emailSignupBox.fill(email)
    await this.signupButton.click()
}

async getUrl(){
  await this.page.url() 
}

 async fillDetails(password,firstName,lastName,company,address,state,zipcode,mobileNumber,city){
  await this.titleMrCheckbox.check()
  await this.passwordBox.fill(password)
  await this.daysMenu.selectOption("10")
  await this.monthsMenu.selectOption("February")
  await this.yearsMenu.selectOption("1990")
  await this.firstNameBox.fill(firstName)
  await this.lastnameBox.fill(lastName)
  await this.companyBox.fill(company)
  await this.addressBox.fill(address)
  await this.countryMenu.selectOption("Canada")
  await this.stateBox.fill(state)
  await this.cityBox.fill(city)
  await this.zipCodeBox.fill(zipcode)
  await this.mobileNumberBox.fill(mobileNumber)
  
}

async submitform(){
  await this.submitformButton.click()
  
}


async clickOnDeleteAccount(){
  await this.deleteAccountButton.click()
}


async completeSignUp(){
    await this.nameBox.fill('name')
    await this.emailSignupBox.fill('email@testingteam.com')
    await this.signupButton.click()
    await this.titleMrCheckbox.check()
    await this.passwordBox.fill('password')
    await this.daysMenu.selectOption("10")
    await this.monthsMenu.selectOption("February")
    await this.yearsMenu.selectOption("1990")
    await this.firstNameBox.fill('firstName')
    await this.lastnameBox.fill('lastName')
    await this.companyBox.fill('company')
    await this.addressBox.fill('address')
    await this.countryMenu.selectOption("Canada")
    await this.stateBox.fill('state')
    await this.cityBox.fill('city')
    await this.zipCodeBox.fill('zipcode')
    await this.mobileNumberBox.fill('0101010')
    await this.submitformButton.click()

  }

}
module.exports = { SignupPage };