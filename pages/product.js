import { expect } from '@playwright/test'


export class ProductPage{
 /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page){
        this.page = page
        this.productsList = page.locator('.features_items')
        this.viewProductButton = page.getByText('View Product')
        this.searchBox = page.locator('#search_product')
        this.searchButton = page.locator('#submit_search')
        this.productInfo = page.locator('.productinfo>p')
        this.searchedProducts = page.getByText('SEARCHED PRODUCTS')
        /* this css selector needs a function to get the item, 
        if you want to select the first item you can use .first() or use .nth() if you know the index of the element */
        this.prodcut = page.locator("div[class='productinfo text-center'] >a")
        this.addToCartButton = page.locator("//div[@Class='productinfo text-center']/a") 
        this.addedPopup = page.locator("//h4[normalize-space()='Added!']")
        this.viewCartButton = page.locator("//u[normalize-space()='View Cart']")
        this.continueShoppingButton = page.getByText('Continue Shopping')
        this.women_category = page.locator("//a[@href='#Women']")
        this.men_category = page.locator("//a[@href='#Men']")
        this.dress_subCategory = page.getByRole('link').filter({hasText:'DRESS'})
        this.jeans_subCategory = page.locator("//a[contains(text(),'Jeans')]")
        this.title_WomenDressProducts = page.getByText('Women - Dress Products')
        this.title_MenJeansProducts = page.getByText('Men - Jeans Products')
        this.viewProductButton_test = page.locator('div[class="product-image-wrapper"]',{hasText:'Men Tshirt'}).getByRole('link',{name:'View Product'}) //('a',{hasText:''})
        this.writeYourReview = this.page.getByRole('link').filter({hasText:'Write Your Review'})
        this.name_filed = this.page.getByPlaceholder('Your Name')
        this.email_field = this.page.getByPlaceholder('Email Address',{exact:true})
        this.addReview_field = this.page.getByPlaceholder('Add Review Here!')
        this.submitReview_button = this.page.locator('#button-review')
        this.review_message = this.page.getByText('Thank you for your review.',{exact:false})
    }

async searchProduct(productName){
    await this.searchBox.fill(productName)
    await this.searchButton.click()
}

async viewproduct(product_name){
    await this.page.locator('div[class="product-image-wrapper"]',{hasText:product_name}).getByRole('link',{name:'View Product'}).click()
    //return this.viewProductButton_test
}


async addReview(userName,userEmail,review){
    await this.name_filed.fill(userName)
    await this.email_field.fill(userEmail)
    await this.addReview_field.fill(review)
    await this.submitReview_button.click()
}


}
