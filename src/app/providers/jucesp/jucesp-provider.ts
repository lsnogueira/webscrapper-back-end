import puppeteer = require('puppeteer');
import { mainLogin } from '..';

export class JucespProvider {
  public browser: puppeteer.Browser;
  private page: puppeteer.Page;

  constructor(private data: any) {}

  public async jucespPage(): Promise<any> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--full-screen', '--disable-notifications']
    });

    this.page = await this.browser.newPage();

    return mainLogin(this.page).then(
      (pageNova: puppeteer.Page) => {
        return this.irPaginaJucesp(pageNova);
      },
      error => console.error(error)
    );
  }

  private async irPaginaJucesp(page: puppeteer.Page): Promise<any> {
    const navigationPromise = page.waitForNavigation();
    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/jucesp/index.html',
      { waitUntil: 'networkidle2' }
    );

    await navigationPromise;
    await page.waitForSelector(
      '#ctl00_cphContent_frmBuscaSimples_txtPalavraChave'
    );
    await page.type(
      '#ctl00_cphContent_frmBuscaSimples_txtPalavraChave',
      this.data.numero_processo ? this.data.numero_processo : '11111111111111'
    );
    await page.waitForSelector('table > tbody > tr > .item02 > input');
    await page.click('table > tbody > tr > .item02 > input');

    await navigationPromise;

    await page.waitForSelector(
      'input[name="ctl00$cphContent$gdvResultadoBusca$CaptchaControl1"]'
    );
    await page.type(
      'input[name="ctl00$cphContent$gdvResultadoBusca$CaptchaControl1"]',
      'eSaq'
    );

    await page.waitForSelector(
      'input[name="ctl00$cphContent$gdvResultadoBusca$btEntrar"]'
    );
    await page.click(
      'input[name="ctl00$cphContent$gdvResultadoBusca$btEntrar"]'
    );

    await navigationPromise;

    await page.waitForSelector(
      '#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lbtSelecionar'
    );
    await page.click(
      '#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lbtSelecionar'
    );

    await navigationPromise;

    await page.waitForSelector('#ctl00_cphContent_frmPreVisualiza_lblNire');
    await page.waitForSelector('#ctl00_cphContent_frmPreVisualiza_lblDetalhes');
    await page.waitForSelector(
      '#ctl00_cphContent_frmPreVisualiza_lblConstituicao'
    );
    await page.waitForSelector(
      '#ctl00_cphContent_frmPreVisualiza_lblAtividade'
    );
    await page.waitForSelector('#ctl00_cphContent_frmPreVisualiza_lblCnpj');
    await page.waitForSelector(
      '#ctl00_cphContent_frmPreVisualiza_lblInscricao'
    );
    await page.waitForSelector('#ctl00_cphContent_frmPreVisualiza_lblObjeto');
    await page.waitForSelector('#ctl00_cphContent_frmPreVisualiza_lblCapital');
    await page.waitForSelector(
      '#ctl00_cphContent_frmPreVisualiza_lblLogradouro'
    );
    await page.waitForSelector('#ctl00_cphContent_frmPreVisualiza_lblNumero');
    await page.waitForSelector('#ctl00_cphContent_frmPreVisualiza_lblBairro');
    await page.waitForSelector(
      '#ctl00_cphContent_frmPreVisualiza_lblComplemento'
    );
    await page.waitForSelector(
      '#ctl00_cphContent_frmPreVisualiza_lblMunicipio'
    );
    await page.waitForSelector('#ctl00_cphContent_frmPreVisualiza_lblCep');
    await page.waitForSelector('#ctl00_cphContent_frmPreVisualiza_lblUf');

    const elementosJson = await page.evaluate(() => {
      let dictCampos: any = {
        NireMatriz: '#ctl00_cphContent_frmPreVisualiza_lblNire',
        TipoEmpresa: '#ctl00_cphContent_frmPreVisualiza_lblDetalhes',
        DataConstituicao: '#ctl00_cphContent_frmPreVisualiza_lblConstituicao',
        InicioAtividade: '#ctl00_cphContent_frmPreVisualiza_lblAtividade',
        CNPJ: '#ctl00_cphContent_frmPreVisualiza_lblCnpj',
        InscricaoEstadual: '#ctl00_cphContent_frmPreVisualiza_lblInscricao',
        Objeto: '#ctl00_cphContent_frmPreVisualiza_lblObjeto',
        Capital: '#ctl00_cphContent_frmPreVisualiza_lblCapital',
        Logradouro: '#ctl00_cphContent_frmPreVisualiza_lblLogradouro',
        Numero: '#ctl00_cphContent_frmPreVisualiza_lblNumero',
        Bairro: '#ctl00_cphContent_frmPreVisualiza_lblBairro',
        Complemento: '#ctl00_cphContent_frmPreVisualiza_lblComplemento',
        Municipio: '#ctl00_cphContent_frmPreVisualiza_lblMunicipio',
        CEP: '#ctl00_cphContent_frmPreVisualiza_lblCep',
        UF: '#ctl00_cphContent_frmPreVisualiza_lblUf'
      };

      let jsonRetorno: any = {};
      Object.keys(dictCampos).forEach(item => {
        let valorCampo: any = (document.querySelector(dictCampos[item]) as any)
          .outerText;
        jsonRetorno[item] = valorCampo;
      });

      return jsonRetorno;
    });

    return elementosJson;
  }
}
