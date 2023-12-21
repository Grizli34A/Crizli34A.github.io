import {test,expect} from '@playwright/test'

//const searchString = 'eri3333';
//const searchString = 'Media'
//const searchString = 'Simpson'
const searchString = 'no'
const expectedSearchResult = "You Don't Know JS"; 
 
let searchResultText ='';

test('Search Functionality Test', async ({ page }) => {
    test.setTimeout(60000)
 await page.goto('https://demoqa.com/books');
  
  await page.getByPlaceholder('Type to search').fill(searchString);

 if(!(await page.getByText('No rows found').isVisible())){
 
    const collection = await page.$$('[role="row"] .action-buttons')
    
    for (const element of collection) {       
        let text = await element.textContent();
        if(expectedSearchResult==text.trim()){
            searchResultText = text
         }
        await page.getByPlaceholder('Type to search').fill(text);
               
      }
    expect(searchResultText).toContain(expectedSearchResult);
 }
});





