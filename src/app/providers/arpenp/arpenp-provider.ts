import puppetteer = require('puppeteer');
import { mainLogin } from '../barrel';
import { json } from 'body-parser';

const data = {
  numero_processo: "11111111111111"
};

export async function arpenpPage(page: puppetteer.Page): Promise<void> {


  mainLogin(page).then(irPaginaArpenp, (error) => {
    console.log("Deu erro")
  });

}


async function irPaginaArpenp(page: puppetteer.Page): Promise<void> {
    
    await page.goto("http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/arpensp/login.html", { waitUntil: 'networkidle2' });
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1280, height: 578 });
    
    await page.waitForSelector('.row > .col-3 > .card-metro > a > .img-fluid')
    await page.click('.row > .col-3 > .card-metro > a > .img-fluid')
    
    await navigationPromise
    
    await page.waitForSelector('#wrapper .item3 #arrumaMenu')
    await page.click('#wrapper .item3 #arrumaMenu')
    
    await navigationPromise
    
    await page.waitForSelector('body .menu > .item3 > ul > .subitem1:nth-child(1) > a')
    await page.hover('.menu > .item3 > ul >  .subitem1:nth-child(1) > a')
    await page.waitFor(1000)
    await page.click('.menu > .item3 > ul >  .subitem1:nth-child(1) > a')
    
    await navigationPromise
    
    await page.waitFor(500)
    await page.waitForSelector('table #n')
    await page.click('table #n')
    
    await page.type('body input[name="numero_processo"]', data.numero_processo);

    await page.waitForSelector('table #btn_pesquisar')
    await page.click('table #btn_pesquisar')
    
    await navigationPromise

    await page.waitForSelector("input[type='hidden']")

    const elementosJson = await page.evaluate(() => {
        let dadosInput: any = Array.prototype.map.call(document.querySelectorAll("input[type='hidden']"), (item) => {
            return [item.name, item.value]
        })
        
        let json:any = {}
        dadosInput.forEach((item: Array<string>) => {
            
            json[item[0]] = item[1]
        })

        return json

    })
    
    console.log(elementosJson)
}
  