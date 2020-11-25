const puppeteer = require('puppeteer');

const fs = require("fs");


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
  
  let addressA = fs.readFileSync("/home/ilya/PycharmProjects/taxi_answering_machine/addressA.txt", "utf8");
  //let addressA = `Долгоруковская улица, 40`;
  let addressB = fs.readFileSync("/home/ilya/PycharmProjects/taxi_answering_machine/addressB.txt", "utf8");
  let phoneNumber = '+7-999-810-34-56'
  let comment = fs.readFileSync("/home/ilya/PycharmProjects/taxi_answering_machine/comment.txt", "utf8")

  await page.type('#address-a', addressA);
  await page.type('#address-b', addressB);

  await page.waitForTimeout(300);
  await page.click('#address-a');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  
  await page.waitForTimeout(300);
  await page.click('#address-b');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  
  //await page.click('#address-a-popup');
  
  await page.type('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div.Fields__row.Fields__row_type_properties > div.Fields__col.Fields__col_type_auth > div > div > div > input', phoneNumber);
  await page.type('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div.Fields__row.Fields__row_type_properties > div.Fields__col.Fields__col_type_comment > div > div > div > input', comment);
  
  //кнопка "заказать"
  //await page.click('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > button');

  //нажатие на выпадающий список требований
  //await page.click('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div:nth-child(5) > div > div > ul > li.amber-list-item.amber-list-item_header > div > div > div > div');

  //await page.type('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div.Fields__row.Fields__row_type_properties > div.Fields__col.Fields__col_type_auth > div > div > div > input', phoneNumber);
  //await page.type('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div.Fields__row.Fields__row_type_properties > div.Fields__col.Fields__col_type_comment > div > div > div > input', Comment);
 

  //клик на детское кресло
  //await page.click('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div:nth-child(5) > div > div > ul > li:nth-child(6)');


  //клик на Велосипед
  //await page.click('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div:nth-child(5) > div > div > ul > li:nth-child(6)');


  //клик на лыжи или сноуборд
  //await page.click('#application > div.Page > div.Form.Grid__container > section:nth-child(1) > div > div:nth-child(5) > div > div > ul > li:nth-child(8)');
  

  await page.screenshot({path: 'taxi.png'});
  //await browser.close();
}

Taxi();
