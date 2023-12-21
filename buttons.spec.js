import {test,expect} from '@playwright/test'

test('Previous and Next buttons testing', async({page})=>{
    test.setTimeout(60000)
    await page.goto('https://demoqa.com/books')

    const footer = await page.$('footer');
    expect(footer).not.toBeNull();
    await page.evaluate((element) => {
        element.style.display = 'none';
      }, footer); 

    const prevBtn =  page.getByText("Previous")
    const nextBtn =   page.getByText("Next")

    expect(prevBtn).not.toBeNull()
    expect(nextBtn).not.toBeNull()

    const select = await page.$('select')
    await select.selectOption("5 rows")

    let collection = await page.$$('[role="row"] .action-buttons')
    let lastCollection 
    const inputElement = await page.$('.-pageJump > input')
    let pageNumber = await inputElement.getAttribute('value');
    const maxPage = await page.$('.-totalPages')
   
    let pageNumLastState

    while (+pageNumber!= +(await maxPage.textContent())) {
        await nextBtn.click()
        pageNumLastState = pageNumber
        lastCollection = collection
        collection = await page.$$('[role="row"] .action-buttons')
        pageNumber = await inputElement.getAttribute('value')
        expect(+pageNumber).toBeGreaterThan(+pageNumLastState)
        expect(+pageNumber).toBeLessThan(+pageNumLastState+2)
        expect(lastCollection).not.toEqual(collection)    
    }
   await page.pause()
    while(+pageNumber!=1){
        await prevBtn.click()        
        pageNumLastState = pageNumber
        lastCollection = collection
        collection = await page.$$('[role="row"] .action-buttons')
        pageNumber = await inputElement.getAttribute('value')
        expect(+pageNumber).toBeLessThan(+pageNumLastState)
        expect(+pageNumber).toBeGreaterThan(+pageNumLastState-2)
        expect(lastCollection).not.toEqual(collection)
    }   
    await page.pause()
})