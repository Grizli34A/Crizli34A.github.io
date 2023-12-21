import {test,expect} from '@playwright/test'

test('Drop down testing', async({page})=>{
   test.setTimeout(60000) 
   await page.goto('https://demoqa.com/books')
 
//при заходе на страницу у нас не отображается выпадающий список и кнопки previous и next из-за футера,
//временно уберем его со страницы
     const footer = await page.$('footer');
    expect(footer).not.toBeNull();
    await page.evaluate((element) => {
        element.style.display = 'none';
      }, footer); 
       
    const select = await page.$('select')
    const selectValues = await page.$$('select > option')
      
    for(const item of selectValues){
      select.selectOption(item)
      await page.pause()
      const amountRows = await item.getAttribute('value')
      const collection = await page.$$('[role="row"]')
      expect(+amountRows).toEqual(collection.length-1);
    }  
}
   )