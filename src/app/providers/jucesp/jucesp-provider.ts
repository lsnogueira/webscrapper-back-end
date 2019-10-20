import puppetteer = require('puppeteer');
import { mainLogin } from '..';
import { json } from 'body-parser';

const data = {
  numero_processo: '11111111111111'
};

export class JucespProvider {
  constructor(private page: puppetteer.Page) {}

  public async jucespPage(): Promise<void> {
    mainLogin(this.page).then(this.irPaginaJucesp, () =>
      console.error('Erro de login')
    );
  }

  private async irPaginaJucesp(page: puppetteer.Page): Promise<void> {
    const navigationPromise = page.waitForNavigation();
    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/jucesp/index.html',
      { waitUntil: 'networkidle2' }
    );

    
    

   
    await navigationPromise
    await page.waitForSelector("#ctl00_cphContent_frmBuscaSimples_txtPalavraChave");
    await page.type("#ctl00_cphContent_frmBuscaSimples_txtPalavraChave",data.numero_processo);
    await page.waitForSelector('table > tbody > tr > .item02 > input');
    await page.click('table > tbody > tr > .item02 > input')
  
    

    await navigationPromise

    await page.waitForSelector('input[name="ctl00$cphContent$gdvResultadoBusca$CaptchaControl1"]')
    await page.type('input[name="ctl00$cphContent$gdvResultadoBusca$CaptchaControl1"]',"eSaq")

    await page.waitForSelector('input[name="ctl00$cphContent$gdvResultadoBusca$btEntrar"]')
    await page.click('input[name="ctl00$cphContent$gdvResultadoBusca$btEntrar"]')

    await navigationPromise


    await page.waitForSelector("#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lbtSelecionar")
    await page.click("#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lbtSelecionar")
    
    await navigationPromise


    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblNire")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblDetalhes")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblConstituicao")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblAtividade")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblCnpj")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblInscricao")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblObjeto")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblCapital")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblLogradouro")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblNumero")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblBairro")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblComplemento")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblMunicipio")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblCep")
    await page.waitForSelector("#ctl00_cphContent_frmPreVisualiza_lblUf")


    const elementosJson = await page.evaluate(() => {
      let dictCampos: any = {
        "NireMatriz": 		"#ctl00_cphContent_frmPreVisualiza_lblNire",
        "TipoEmpresa": 		"#ctl00_cphContent_frmPreVisualiza_lblDetalhes",
        "DataConstituicao": 	"#ctl00_cphContent_frmPreVisualiza_lblConstituicao",
        "InicioAtividade": 	"#ctl00_cphContent_frmPreVisualiza_lblAtividade",
        "CNPJ": 				"#ctl00_cphContent_frmPreVisualiza_lblCnpj",
        "InscricaoEstadual": 	"#ctl00_cphContent_frmPreVisualiza_lblInscricao",
        "Objeto": 			"#ctl00_cphContent_frmPreVisualiza_lblObjeto",
        "Capital": 			"#ctl00_cphContent_frmPreVisualiza_lblCapital",
        "Logradouro": 		"#ctl00_cphContent_frmPreVisualiza_lblLogradouro",
        "Numero": 			"#ctl00_cphContent_frmPreVisualiza_lblNumero",
        "Bairro": 			"#ctl00_cphContent_frmPreVisualiza_lblBairro",
        "Complemento": 		"#ctl00_cphContent_frmPreVisualiza_lblComplemento",
        "Municipio": 			"#ctl00_cphContent_frmPreVisualiza_lblMunicipio",
        "CEP": 				"#ctl00_cphContent_frmPreVisualiza_lblCep",
        "UF": 				"#ctl00_cphContent_frmPreVisualiza_lblUf"
        }

        let jsonRetorno: any = {}
        Object.keys(dictCampos).forEach((item) => {
            let valorCampo: any = (document.querySelector(dictCampos[item]) as any).outerText
            jsonRetorno[item] = valorCampo
        })
        

      return jsonRetorno;
    });
    
    console.log(elementosJson)
    return elementosJson
  }
}
