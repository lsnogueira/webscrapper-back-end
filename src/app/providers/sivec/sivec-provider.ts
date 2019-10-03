import puppetteer = require('puppeteer');
import { mainLogin } from '../barrel';
import { json } from 'body-parser';

const data = {
  rg: "11111111111111",
  nome:"teste",
  matriculaSap:"213213213"

};

export async function sivecPage(page: puppetteer.Page): Promise<void> {


  mainLogin(page).then(irPaginaSivec, (error) => {
    console.log("Deu erro")
  });

}


async function irPaginaSivec(page: puppetteer.Page): Promise<void> {
    
    await page.goto("http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/sivec/login.html", { waitUntil: 'networkidle2' });
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1280, height: 578 });
    await page.waitForSelector("input[name='nomeusuario']")
    await page.waitForSelector('input[name="senhausuario"]')
    await page.type("input[name='nomeusuario']","fiap")
    await page.type('input[name="senhausuario"]',"mpsp")
    await page.waitForSelector('input[type="submit"]')
    await page.click('input[name="Acessar"]')

    await navigationPromise

    await page.waitForSelector('.navbar > #navbar-collapse-1 > .nav > .dropdown:nth-child(4) > a')
    await page.click('.navbar > #navbar-collapse-1 > .nav > .dropdown:nth-child(4) > a')
    
    await page.waitFor(300)
  
    await page.waitForSelector('ul[role="menu"] > li > a[id="1"]')
    await page.click('ul[role="menu"] > li > a[id="1"]')

    await page.waitFor(300)

    if(data.rg != ""){
        await page.waitForSelector('.dropdown-menu > .open > .dropdown-menu > li:nth-child(1) > a')
        await page.click('.dropdown-menu > .open > .dropdown-menu > li:nth-child(1) > a')
        await page.waitForSelector('input[id="idValorPesq"]')
        await page.type('input[id="idValorPesq"]', data.rg)
        await page.waitForSelector('input[id="procurar"]')
        await page.click('input[id="procurar"]')

      
  
    }
    else if(data.matriculaSap != ""){
        await page.waitForSelector('.dropdown-menu > .open > .dropdown-menu > li:nth-child(3) > a')
        await page.click('.dropdown-menu > .open > .dropdown-menu > li:nth-child(3) > a')
        await page.waitForSelector('input[id="idValorPesq"]')
        await page.type('input[id="idValorPesq"]', data.matriculaSap)
        await page.waitForSelector('input[id="procurar"]')
        await page.click('input[id="procurar"]')
  
    }
    else if(data.nome != ""){
        await page.waitForSelector('.dropdown-menu > .open > .dropdown-menu > li:nth-child(2) > a')
        await page.click('.dropdown-menu > .open > .dropdown-menu > li:nth-child(2) > a')
        await page.waitForSelector('input[id="idNomePesq"]')
        await page.type('input[id="idNomePesq"]', data.nome)
        await page.waitForSelector('input[id="procurar"]')
        await page.click('input[id="procurar"]')
  
    }

    await navigationPromise
    await page.waitForSelector('#tabelaPesquisa > tbody > .odd:nth-child(1) > .textotab1 > .textotab1')
    await page.click('#tabelaPesquisa > tbody > .odd:nth-child(1) > .textotab1 > .textotab1')
    await navigationPromise

    await page.waitForSelector('.container > .row > div > .textotab2')
    await page.waitForSelector('.table.compact > tbody > tr')

    await page.waitFor(300)
    const elementosJson = await page.evaluate(() => {

        function limparTextoChave(textoChave: string): string{
            return textoChave.toLowerCase().replace(" de ","_").replace("/","_").replace(" dos ","_").replace(" da ","_").replace(" do ","_").replace("ó","o")
            .replace(":","").replace("º", "").replace(" ", "_").replace("(s/n)", "")
        .replace("ç", "c").replace("ã", "a")
        }
        
        let elementosTr = document.querySelectorAll(".table.compact > tbody > tr")
        let elementosTd = Array.prototype.map.call(elementosTr, (item) => item.children)
        console.log("ESTOU AQUI")

        let elementosFiltrados = Array.prototype.map.call(elementosTd, (item) => {

            return Array.prototype.filter.call(item, (iTd) => {
                if(iTd.outerHTML == "<td></td>"){
                    return false
                }
                return true
            })
        })

        console.log(elementosFiltrados)

        let elementosStr = Array.prototype.map.call(elementosFiltrados, (item) => {
            return Array.prototype.map.call(item, (iText) => {
                return iText.outerText
            })
        })

        console.log(elementosStr)

        let json: any = {}
        
        elementosStr.forEach((item: any) => {
            json[limparTextoChave(item[0])] = item[1]
            json[limparTextoChave(item[2])] = item[3]
        })
        console.log("CONSTRUINDO O JSON")
        console.log(json)


        let elementosTx = document.querySelectorAll(".container > .row > div > .textotab2")
        let elementosDiv = Array.prototype.map.call(elementosTx, (item) => item.parentElement.parentElement)
        let elementosC = Array.prototype.map.call(elementosDiv, (item) => item.children)
        let elementosOuterText = Array.prototype.map.call(elementosC, (item) => [item[0].outerText, item[1].outerText])

        elementosOuterText.forEach((item: any) => {
            json[limparTextoChave(item[0])] = item[1]
        });

        return json
    })

    console.log(elementosJson)
    
   
}


  