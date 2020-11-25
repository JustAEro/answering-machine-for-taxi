const puppeteer = require('puppeteer');


// #address-a
// #address-b
// #application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div.Fields__row.Fields__row_type_properties > div.Fields__col.Fields__col_type_auth > div > div > div > input
// #application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div.Fields__row.Fields__row_type_properties > div.Fields__col.Fields__col_type_comment > div > div > div > input
// #application > div.Page > div.Form.Grid__container > section:nth-child(1) > button
// #application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div:nth-child(5) > div > div > ul > li.amber-list-item.amber-list-item_header > div > div > div > div


async function Taxi() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://taxi.yandex.ru/');
  await page.setViewport({width: 1000, height: 500});
  
  //нажатие на выпадающий список требований
  await page.click('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div:nth-child(5) > div > div > ul > li.amber-list-item.amber-list-item_header > div > div > div > div');

  //нажатие кнопки "заказать"
  await page.click('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > button');

  await page.screenshot({path: 'sample.png'});
  //await browser.close();
}

Taxi();
