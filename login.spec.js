import {test,expect} from '@playwright/test'

const userName = 'Mikhail34'
const password = 'Test12345.!'

test('Login',async({page}) =>{
    test.setTimeout(60000)
    await page.goto('https://demoqa.com/books')
    await page.getByRole('button',{ name: 'Login' }).click()
    await page.pause()
    await page.locator('[placeholder=UserName]').fill(userName)
    await page.locator('[placeholder=Password]').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
    await page.pause()
    await expect(page.getByRole('button', { name: 'Log out' })).toHaveCount(1)
    await expect(page.getByText(userName)).toHaveCount(1)
    await page.getByRole('button', { name: 'Log out' }).click()
})

