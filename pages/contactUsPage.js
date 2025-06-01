var path = require('path');
export class contactUsPage{
    
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page){
        this.page = page
        this.getInTouchText = page.getByText('GET IN TOUCH')
        this.nameBox_contactUs = page.getByPlaceholder('Name')
        this.emailBox_contactUs = page.locator('input[name="email"]')
        this.subject_contactUs = page.locator('input[name="subject"]')
        this.messageBox_contactUs = page.locator('#message')
        this.uploaddocumentButton = page.locator('input[name="upload_file"]')
        this.submitButton_contactUs = page.getByText('Submit')
        this.successMessage_contactUs = page.locator('div[class="status alert alert-success"]')
        this.homeButton_contactUs = page.locator('a[class="btn btn-success"]')
    }   


async enterNameContactUs(name){
    await this.nameBox_contactUs.fill(name)
}

async enterEmailContactUs(email){
    await this.emailBox_contactUs.fill(email)
}
   
async enterSubjectContactUs(subject){
    await this.subject_contactUs.fill(subject)
}
async enterMessageContactUs(message){
    await this.messageBox_contactUs.fill(message)
}

async uploadDocumentContactUs(file){
    await this.uploaddocumentButton.setInputFiles(file)
}
async clickSubmitContactUs(){
    await this.submitButton_contactUs.click()
}
async ConfirmAlert(){
    this.page.on('dialog', async dialog => {
        await dialog.accept();
        console.log('dialog dismissed');
    })
    }
async clickHomeContactUs(){
    await this.homeButton_contactUs.click()
}
}