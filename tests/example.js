// @ts-check
import { test, expect } from '@playwright/test' 

export class testing{
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page){
    this.page = page
    this.clickmebutton = page.getByPlaceholder('test')
    this.url = 'https://demo.automationtesting.in/Alerts.html'
      this.noconsentbutton =  page.getByText("Do not consent")
      this.okbutton =  page.getByText('Alert with OK & Cancel')
      //page.on('dialog',dialog=>dialog.accept())
      this.confirmbutton =  page.getByText('click the button to display a confirm box')
      this.text = page.getByText('You pressed Ok')
      this.register = page.getByText('Register',{exact:false})
    }

async navigate(){
  await this.page.goto(this.url)
}

async actions(){
  await this.noconsentbutton.click()
  await this.okbutton.click()
}

async display(){
  await this.confirmbutton.click()
}
async clickregister(){
  await this.register.click()
}
}