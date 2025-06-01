import { testing } from "./example";
import {test,expect} from '@playwright/test'

test('alerts',async({page})=>{
   const  mohamed = new testing(page)
    await mohamed.navigate()
    await mohamed.actions()
    page.on('dialog',dialog=>dialog.accept())
    await mohamed.display()
    await expect(mohamed.text).toBeVisible()
   // await page.pause()
    await mohamed.clickregister()
    await expect(mohamed.text).not.toBeVisible()
    await page.pause()
})
