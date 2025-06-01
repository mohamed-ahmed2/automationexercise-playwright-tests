import { expect } from '@playwright/test'


export class ProductDetailPage{
 /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page){
        this.page = page
        this.productName = page.locator('div[class="product-information"]>h2')
       this.brand = page.getByRole('paragraph').filter({hasText:'Brand'}) 
       this.condition = page.getByRole('paragraph').filter({hasText:'Condition'})
       this.availability = page.getByRole('paragraph').filter({hasText:'Availability'})
       this.category = page.getByRole('paragraph').filter({hasText:'Category'})
       this.price = page.locator('div[class="product-information"]>span>span')

    }
}
