import puppeteer = require('puppeteer');
import { mainLogin } from '..';
import { json } from 'body-parser';
import * as fs from 'fs';

export class InfocrimProvider {
  private page: puppeteer.Page;
  public browser: puppeteer.Browser;
  constructor() {}

  public async infocrimPage(): Promise<any> {
    this.browser = await puppeteer.launch({
      headless: false,
      args: ['--full-screen', '--disable-notifications']
    });
  
    this.page = await this.browser.newPage();

    return mainLogin(this.page).then(
      (pageNova: puppeteer.Page) => {
        return this.irPaginaInfocrim(pageNova)
      },
      (error) => console.error(error)
    );
  }

  private async irPaginaInfocrim(page: puppeteer.Page): Promise<any> {
    function limparTextoChave(textoChave: string): string {
      return textoChave
        .toLowerCase()
        .replace(' de ', '_')
        .replace('/', '_')
        .replace(' dos ', '_')
        .replace(' da ', '_')
        .replace(' do ', '_')
        .replace('ó', 'o')
        .replace(':', '')
        .replace('º', '')
        .replace(' ', '_')
        .replace('(s/n)', '')
        .replace('ç', 'c')
        .replace('ã', 'a')
          .replace(' de ', '_')
          .replace('-', '')
          .replace('/', '_')
          .replace('/', '_')
          .replace(' dos ', '_')
          .replace(' da ', '_')
          .replace(' do ', '_')
          .replace('ó', 'o')
          .replace(':', '')
          .replace('º', '')
          .replace(' ', '_')
          .replace('(s/n)', '')
          .replace('(s)', '')
          .replace('ç', 'c')
          .replace('ã', 'a')
          .replace(' (cnae)', '')
          .replace('ê', 'e')
          .replace('ú', 'u')
          .replace('í', 'i')
          .replace('õ', 'o')
          .replace('ú', 'u')
          .replace('ô', 'o')
          .replace('1_dia', 'primeiro_dia');
    }
   

    const navigationPromise = page.waitForNavigation();
    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/infocrim/login.html',
      { waitUntil: 'networkidle2' }
    );

    await navigationPromise
    
    await page.setViewport({ width: 1280, height: 578 })
    
    await page.waitForSelector('tbody > tr:nth-child(2) > td > a > img')
    await page.click('tbody > tr:nth-child(2) > td > a > img')

    await navigationPromise

    await page.waitForSelector('tr #enviar')
    await page.click('tr #enviar')

    await navigationPromise

    await page.waitForSelector('table > tbody > tr:nth-child(2) > .linhaDet > a')
    await page.click('table > tbody > tr:nth-child(2) > .linhaDet > a')
    
    await navigationPromise

    await page.waitForSelector("pre")

    /* @@@@@@@@@@@@@@ Inicio page evaluate @@@@@@@@@@@@@@*/
    const elementosJson = await page.evaluate(() => {
      let limparTextoChave:any = function(textoChave: string): string {
        return textoChave
          .toLowerCase()
          .replace(' de ', '_')
          .replace('/', '_')
          .replace(' dos ', '_')
          .replace(' da ', '_')
          .replace(' do ', '_')
          .replace('ó', 'o')
          .replace(':', '')
          .replace('º', '')
          .replace(' ', '_')
          .replace('(s/n)', '')
          .replace('ç', 'c')
          .replace('ã', 'a')
            .replace(' de ', '_')
            .replace('-', '')
            .replace('/', '_')
            .replace('/', '_')
            .replace(' dos ', '_')
            .replace(' da ', '_')
            .replace(' do ', '_')
            .replace('ó', 'o')
            .replace(':', '')
            .replace('º', '')
            .replace(' ', '_')
            .replace('(s/n)', '')
            .replace('ç', 'c')
            .replace('ã', 'a')
            .replace(' (cnae)', '')
            .replace('ê', 'e')
            .replace('ú', 'u')
            .replace('í', 'i')
            .replace('õ', 'o')
            .replace('ú', 'u')
            .replace('ô', 'o')
            .replace('1_dia', 'primeiro_dia');
      }
      
      var valoresSplitados:any = []
      var dictChaveValor
      var valoresPagina:any = (document as any).querySelector("pre").outerText
      valoresSplitados  = valoresPagina.split("\n")
      console.log(valoresSplitados)
      var novaLista: any = []

      /*Começando processo de ajuste nos valores */
      

      valoresSplitados = valoresSplitados.filter((item: any) => {
        return item.trim() != ""
      })
      
      dictChaveValor = valoresSplitados.map((item: any) => {
        
        let posicao = item.indexOf(":")
        if(posicao == -1){
          return {"tituloRelatorio": item}
        }
        let dictReturn: any = {}
        let chave = limparTextoChave(item.substring(0,posicao).trim())
        let valor = item.substring(posicao +1,item.length).trim()
        dictReturn[chave] = valor
        return dictReturn
      });

      console.log(dictChaveValor)
      return dictChaveValor
      
    })
    console.log(elementosJson)
    return elementosJson
    




  
    }
}
