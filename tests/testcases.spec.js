import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import {TestCasesPage} from '../pages/testcasesPage';

test('test cases page is visible',async ({page})=>{
    const homePage = new HomePage(page)
        await homePage.navigateToHome()
        await homePage.handleCookiesPopup()
        await homePage.clickonTestCases()
        const testCasesPage = new TestCasesPage(page)
        await expect(testCasesPage.page).toHaveURL('https://automationexercise.com/test_cases')
})