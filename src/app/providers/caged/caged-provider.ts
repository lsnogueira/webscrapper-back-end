import puppetteer = require('puppeteer');
import { mainLogin } from '..';
import { json } from 'body-parser';

const data = {
  cnpj: "11111111111111"
};

export async function cagedPage(page: puppetteer.Page): Promise<void> {


  mainLogin(page).then(irPaginaCaged, (error) => {
    console.log("Deu erro")
  });

}


async function carregarLabelTxtTelas(page: puppetteer.Page){
    return async function carregandoElemento(elemento: string){
        await page.waitForSelector("#"+elemento)
    }
}

    



async function irPaginaCaged(page: puppetteer.Page): Promise<void> {
    
    function limparTextoChave(textoChave: string): string{
        return textoChave.toLowerCase().replace(" de ","_").replace("/","_").replace(" dos ","_").replace(" da ","_").replace(" do ","_").replace("ó","o")
        .replace(":","").replace("º", "").replace(" ", "_").replace("(s/n)", "")
    .replace("ç", "c").replace("ã", "a")
    }

    await page.goto("http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/caged/login.html", { waitUntil: 'networkidle2' });
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1280, height: 578 });
    
    await page.waitForSelector("input[name='username']")
    await page.waitForSelector('input[name="password"]')
    await page.type("input[name='username']","fiap")
    await page.type('input[name="password"]',"mpsp")
    await page.waitForSelector('#btn-submit')
    await page.click('#btn-submit')

    await navigationPromise
    
    await page.hover("#nav > li:nth-child(1)")
    await page.waitFor(300)
    await page.click('a[id="j_idt12:idMenuLinkAutorizado"]')
    
    await navigationPromise

    // await page.waitFor(300)
    // await page.waitForSelector('select[name="formPesquisarAutorizado:slctTipoPesquisaAutorizado"]')
    // await page.select('select[name="formPesquisarAutorizado:slctTipoPesquisaAutorizado"]', '1')

    // await page.waitForSelector('select[name="formPesquisarAutorizado:slctPesquisarPrimeiroAutorizado"]')
    // await page.select('select[name="formPesquisarAutorizado:slctPesquisarPrimeiroAutorizado"]', '1')

    // await page.waitForSelector('input[id="formPesquisarAutorizado:txtChavePesquisaAutorizado014"]')
    // await page.type('input[id="formPesquisarAutorizado:txtChavePesquisaAutorizado014"]', data.cnpj)

    await page.waitFor(300)
    await page.waitForSelector('input[id="formPesquisarAutorizado:bt027_8"]')
    await page.click('input[id="formPesquisarAutorizado:bt027_8"]')

    await navigationPromise

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ CHEGUEI @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            
    var listaValoresElement: any = {lbCnpjCpf020_1:["txCnpj020_2"],lbrazaosocial020_3:["txtrazaosocial020_4"], 
    lb3_logradouro020:["txt3_logradouro020"], lb4_bairro020:["txt4_bairro020"], lb6_municipio020:["txt5_codmunicipio020", "txt6_municipio020"], lb7_uf020: ["txt7_uf020"],
     lb8_cep020: ["txt8_cep020"], lb_nome_contato:["txt_nome_contato"],
        lb_contato_cpf: ["txt_contato_cpf"], lb9_telefone020:["txt21_ddd020", "txt9_telefone020"], lb10_ramal020: ["txt10_ramal020"],lb11_email:["txt11_email"]}

    console.log("ESTOU AQUI")
    console.log(listaValoresElement)
    Object.keys(listaValoresElement).forEach(await carregarLabelTxtTelas(page))
    // Object.keys(listaValoresElement).forEach((chaveHtml: string) => {
    //     listaValoresElement[chaveHtml].forEach(carregarLabelTxtTelas(page))
    // })



    const elementosJson = await page.evaluate(() => {
        let json: any = {}

    
        console.log("ESTOI AQUI")
        Object.keys(listaValoresElement).forEach((chaveHtml: string) => {
            console.log("CHAVE: " + chaveHtml)
            let strValue: string = ""
            let elementoValor: any
            let elementoStr: string
            let chaveJson: string = ""
            let elementoChave: any = document.querySelector("#"+chaveHtml)
            chaveJson = limparTextoChave(elementoChave.outerText)
            console.log(chaveJson)

            console.log("Indo para o foreach")

            listaValoresElement[chaveHtml].forEach((itemValue: any) =>{
                elementoValor = document.querySelector("#"+itemValue)
                console.log(elementoValor)
                elementoStr = elementoValor.outerText

                strValue += elementoStr + " "
            })

            json[chaveJson] = strValue.trim()

        })

        return json
    })

    console.log(elementosJson)

    //lbCnpjCpf020_1
    //txCnpj020_2

    //lbrazaosocial020_3
    //txtrazaosocial020_4

    //lb3_logradouro020
    //txt3_logradouro020

    //lb4_bairro020
    //txt4_bairro020

    //lb6_municipio020
    //txt5_codmunicipio020 txt6_municipio020

    //lb7_uf020
    //txt7_uf020

    //lb8_cep020
    //txt8_cep020

    //lb_nome_contato
    //txt_nome_contato

    //lb_contato_cpf
    //txt_contato_cpf

    //lb9_telefone020
    //txt21_ddd020
    //txt9_telefone020

    //lb10_ramal020
    //txt10_ramal020

    //lb11_email
    //txt11_email

    


    
    

    
}
  