
export class TestCasesPage{
    /** 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page){
        this.page = page
        this.testCasesLink = page.getByText('Test Cases',{exact:false})
        
    }
}