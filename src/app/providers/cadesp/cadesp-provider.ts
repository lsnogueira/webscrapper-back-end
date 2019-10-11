import puppetteer = require('puppeteer');
import { mainLogin } from '../barrel';
import { json } from 'body-parser';

const data = {
  cnpjInformado: "11111111111111"
};

export async function cadespPage(): Promise<any> {
  const browser = await puppetteer
    .launch();
  const page = await browser.newPage();
  

  return mainLogin(page).then(irPaginaCadesp, (error) => {
    console.log("Deu erro")

  });

}


async function irPaginaCadesp(page: puppetteer.Page): Promise<any> {
    console.log("ESTOU INDO AQUI")
    await page.goto("http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/cadesp/login.html", { waitUntil: 'networkidle2' });
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1280, height: 578 });

    await page.waitForSelector('body #ctl00_conteudoPaginaPlaceHolder_loginControl_UserName');
    await page.waitForSelector('body #ctl00_conteudoPaginaPlaceHolder_loginControl_Password');
    await page.waitForSelector('body #ctl00_conteudoPaginaPlaceHolder_loginControl_loginButton');

    await page.type('body #ctl00_conteudoPaginaPlaceHolder_loginControl_UserName', 'fiap');
    await page.type('body #ctl00_conteudoPaginaPlaceHolder_loginControl_Password', 'mpsp');
    await page.click('body #ctl00_conteudoPaginaPlaceHolder_loginControl_loginButton');

    await navigationPromise;

    await page.waitForSelector('#aspnetForm > .conteudoGeral > tbody > tr > .conteudoPrincipal')
    await page.click('#aspnetForm > .conteudoGeral > tbody > tr > .conteudoPrincipal')

    await page.hover('body #ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperiorn1');
    //await page.waitFor(10)

    await page.hover('body .ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_1.menuSuperiorLevel1.ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_6')
    await page.waitForSelector('.ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_19 > tbody > tr > td > .ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_1')
    await page.click('.ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_19 > tbody > tr > td > .ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_1')
    
    await navigationPromise;

    await page.waitForSelector('body #ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_lstIdentificacao');
    await page.waitForSelector('body #ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_txtIdentificacao');

    await page.select('body #ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_lstIdentificacao', '2');
    await page.type('body #ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_txtIdentificacao', data.cnpjInformado);

    await page.click('body #ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_btnConsultarEstabelecimento');
    //Array.prototype.map.call(page.$("#ctl00_conteudoPaginaPlaceHolder_dlCabecalho td.labelDetalhe"), (item) => (item.parentNode))
    //Array.prototype.map.call(page.$("#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral td.labelDetalhe"), (item) => (item.parentNode))  

    await navigationPromise;

    await page.waitForSelector('#ctl00_conteudoPaginaPlaceHolder_dlCabecalho td.labelDetalhe');
    await page.waitForSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral td.labelDetalhe');

    //Construção de algoritmo de captura de informações na tela do cadesp
    const elementosJson = await page.evaluate(() => {
      
      /* Tabela Cabecalho */

      //Leitura das TRs
      let linhasTr = Array.prototype.map.call(document.querySelectorAll("body #ctl00_conteudoPaginaPlaceHolder_dlCabecalho td.labelDetalhe"), (item) => (item.parentNode))
      //Captura das cells contidas nas Trs
      let htmlCollections= Array.prototype.map.call(linhasTr, (item) => (item.cells))
      //Captura do conteúdo das cells
      let  elementos = Array.prototype.map.call(htmlCollections,(item) => Array.prototype.map.call(item, (elemento) => elemento.outerText))
      //Arrumando o conteudo
      let listaArrumada = Array.prototype.map.call(elementos, (item, index) => {
        let splitando = item[2].split(":")
        let listaElementos = item.slice(0)
        listaElementos.pop()
        listaElementos = listaElementos.concat(splitando)
        return listaElementos
      })
      
      //Geração de uma unica lista com todos os conteudos
      var listaConcatCabecalho: any = []
      for (let i in listaArrumada){
        listaConcatCabecalho = listaConcatCabecalho.concat(listaArrumada[i])
      }

   
      
      /* Tabela Estabelecimento */
      
      //Captura das Trs
      let linhasTrEstabelecimento = Array.prototype.map.call(document.querySelectorAll("#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral td.labelDetalhe"), (item) => (item.parentNode))
      //Captura das celulas de cada TR 
      let htmlCollectionsEstabelecimento= Array.prototype.map.call(linhasTrEstabelecimento, (item) => (item.cells))
      //Capturando os textos e filtrando para nao pegar dados nulos
      let elementosFEstabelecimento = Array.prototype.map.call(htmlCollectionsEstabelecimento,(item) => Array.prototype.filter.call(item, (elemento) => { 
        if (elemento.outerText.trim() == "") {
          return false
        }
        return true

      }))
      //Filtrando arrays nao vazios
      let elementosF2Estabelecimento = Array.prototype.filter.call(elementosFEstabelecimento, (item) => item.length != 0)
      //Capturando o texto de cada elemento
      let elementosOuterTextEstabelecimento = Array.prototype.map.call(elementosF2Estabelecimento,(item) => Array.prototype.map.call(item, (elemento) => elemento.outerText))
      //Campos que nao tiverem valor substituir por Nao informado
      let elementosArrumadosEstabelecimento = Array.prototype.map.call(elementosOuterTextEstabelecimento,(item, index) => {
        if(item.length == 1){
          return item.concat(item[0].replace(":", "").trim() + " não informado")
        }
        return item
        
      })

      //Agrupando todo conteudo em uma lista só
      let listaConcatEstabelecimento: any = []
      for (let i in elementosArrumadosEstabelecimento){
        listaConcatEstabelecimento = listaConcatEstabelecimento.concat(elementosArrumadosEstabelecimento[i])
      }


      /* Juntando informacoes - Cabecalho e Estabelecimento */
      let listaCompleta: any = listaConcatCabecalho.concat(listaConcatEstabelecimento)


      //Corrigindo valores: 
      listaCompleta = listaCompleta.map(function(item: string, index: any) {
         
        if (index % 2 == 0){
          return item.trim().replace(":", "").replace("ç", "c").replace("ã", "a").replace(" da ","_")
          .replace(" no ", "_").replace(" de ", "_")
          .replace("ê", "e").replace("í","i").replace(" ", "_").toUpperCase()
        }
        return item.trim()


      })

      //Processo para remoção de duplicatas
      let iterador = 0
      let listaAjustada:Array<String> = []
      while(iterador < listaCompleta.length){
        listaAjustada.push(listaCompleta[iterador++] + "ajustesplit" + listaCompleta[iterador++])
      }
      
      //Removendo duplicatadas
      let removerDuplicatas: any = Array.from(new Set(listaAjustada))

      removerDuplicatas = removerDuplicatas.map((item: string) => {
        return item.split("ajustesplit")
      })

    
      //Transformacao em objeto - posteriormente JSON
      let json:any = {}
      removerDuplicatas.forEach((item: Array<string>) => {
        json[item[0].trim()] = item[1].trim()
      })
      

      return json
   });
  
   console.log(elementosJson)

   return elementosJson
}
  