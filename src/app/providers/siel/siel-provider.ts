import puppetteer = require('puppeteer');
import { mainLogin } from '../barrel';
import { json } from 'body-parser';

const data = {
  numero_processo: "11111111111111",
  nome:"KLAUS" 
};

export async function sielPage(page: puppetteer.Page): Promise<void> {


  mainLogin(page).then(irPaginaSiel, (error) => {
    console.log("Deu erro")
  });

}


async function irPaginaSiel(page: puppetteer.Page): Promise<void> {
    
    await page.goto("http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/siel/login.html", { waitUntil: 'networkidle2' });
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1280, height: 578 });
    
    await page.waitForSelector("input[name='usuario']")
    await page.waitForSelector('input[name="senha"]')
    await page.type("input[name='usuario']","fiap")
    await page.type('input[name="senha"]',"mpsp")
    await page.waitForSelector('input[type="submit"]')
    await page.click('input[type="submit"]')

    await navigationPromise
    
    await page.waitForSelector('input[name="num_processo"]')
    await page.waitForSelector('input[name="nome"]')
    await page.type("input[name='num_processo']",data.numero_processo)
    await page.type("input[name='nome']",data.nome)

    
    await page.waitForSelector('table > tbody > tr > td > .img')
    await page.click('table > tbody > tr > td > .img')
    
    await navigationPromise
    
    await page.waitForSelector("table[class='lista'] > tbody")
    const elementosJson = await page.evaluate(() => {
        let elemento: any = document.querySelector("table[class='lista'] > tbody")
        elemento = elemento.children
        
        console.log(elemento)
        let dadosFiltrados: any = Array.prototype.filter.call(elemento, (item: any) => {
            if(item.children.length > 1){
                return true
            }
            return false
        })

        console.log(dadosFiltrados)

        let dadosTd: any = Array.prototype.map.call(dadosFiltrados, (item: any) => {
          return [item.children[0].outerText.toLowerCase().replace(".","").replace(" ","_")
          .replace("ç", "c").replace("ó", "o").replace("í","i").replace("ã","a"), item.children[1].outerText]  
        })
        console.log(dadosTd)
        let jsonRetorno: any = {}
        console.log("ITENS")
        dadosTd.forEach((item: Array<string>) => {
            console.log("ITEM")
            console.log(item)
            jsonRetorno[item[0]] = item[1]
            console.log(jsonRetorno)
        });

        return jsonRetorno

    })

    console.log(elementosJson)
}
  