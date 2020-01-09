import puppeteer = require('puppeteer');
import { mainLogin } from '..';

export class CagedProvider {
  public browser: puppeteer.Browser;
  private page: puppeteer.Page;

  constructor(private data: any) {}

  public async cagedPage(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--full-screen', '--disable-notifications']
    });

    this.page = await this.browser.newPage();

    return mainLogin(this.page).then(
      (pageNova: puppeteer.Page) => {
        return this.irPaginaCaged(pageNova)
      },
      (error) => console.error(error)
    );
  }

  private async irPaginaCaged(page: puppeteer.Page): Promise<any> {

    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/caged/login.html',
      { waitUntil: 'networkidle2' }
    );
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1280, height: 578 });

    await page.waitForSelector("input[name='username']");
    await page.waitForSelector('input[name="password"]');
    await page.type("input[name='username']", 'fiap');
    await page.type('input[name="password"]', 'mpsp');
    await page.waitForSelector('#btn-submit');
    await page.click('#btn-submit');

    await navigationPromise;

    await page.waitForSelector('#nav');
    await page.hover('#nav > li:nth-child(1)');
    await page.click('a[id="j_idt12:idMenuLinkAutorizado"]');

    await navigationPromise;

    await page.waitForSelector('.cnpjFormat');
    await page.type('.cnpjFormat', this.data.cnpj);

    await page.waitForSelector('input[id="formPesquisarAutorizado:bt027_8"]');
    await page.click('input[id="formPesquisarAutorizado:bt027_8"]');

    await navigationPromise;

    await page.waitForSelector('#lbCnpjCpf020_1');
    await page.waitForSelector('#txCnpj020_2');
    await page.waitForSelector('#lbrazaosocial020_3');
    await page.waitForSelector('#txtrazaosocial020_4');
    await page.waitForSelector('#lb3_logradouro020');
    await page.waitForSelector('#txt3_logradouro020');
    await page.waitForSelector('#lb4_bairro020');
    await page.waitForSelector('#txt4_bairro020');
    await page.waitForSelector('#lb6_municipio020');
    await page.waitForSelector('#txt5_codmunicipio020,txt6_municipio020');
    await page.waitForSelector('#lb7_uf020');
    await page.waitForSelector('#txt7_uf020');
    await page.waitForSelector('#lb8_cep020');
    await page.waitForSelector('#txt8_cep020');
    await page.waitForSelector('#lb_nome_contato');
    await page.waitForSelector('#txt_nome_contato');
    await page.waitForSelector('#lb_contato_cpf');
    await page.waitForSelector('#txt_contato_cpf');
    await page.waitForSelector('#lb9_telefone020');
    await page.waitForSelector('#txt21_ddd020,txt9_telefone020');
    await page.waitForSelector('#lb10_ramal020');
    await page.waitForSelector('#txt10_ramal020');
    await page.waitForSelector('#lb11_email');
    await page.waitForSelector('#txt11_email');

    const elementosJson = await page.evaluate(() => {
      let json: any = {};
      const listaValoresElement: any = {
        lbCnpjCpf020_1: ['txCnpj020_2'],
        lbrazaosocial020_3: ['txtrazaosocial020_4'],
        lb3_logradouro020: ['txt3_logradouro020'],
        lb4_bairro020: ['txt4_bairro020'],
        lb6_municipio020: ['txt5_codmunicipio020', 'txt6_municipio020'],
        lb7_uf020: ['txt7_uf020'],
        lb8_cep020: ['txt8_cep020'],
        lb_nome_contato: ['txt_nome_contato'],
        lb_contato_cpf: ['txt_contato_cpf'],
        lb9_telefone020: ['txt21_ddd020', 'txt9_telefone020'],
        lb10_ramal020: ['txt10_ramal020'],
        lb11_email: ['txt11_email']
      };

      function limparTextoChave(textoChave: string): string {
        return textoChave
          .toLowerCase()
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
          .replace('ã', 'a');
      }

      Object.keys(listaValoresElement).forEach((chaveHtml: string) => {
        let strValue: string = '';
        let elementoValor: any;
        let elementoStr: string;
        let chaveJson: string = '';
        const elementoChave: any = document.querySelector('#' + chaveHtml);
        chaveJson = limparTextoChave(elementoChave.outerText);

        listaValoresElement[chaveHtml].forEach((itemValue: any) => {
          elementoValor = document.querySelector('#' + itemValue);
          elementoStr = elementoValor.outerText;

          strValue += elementoStr + ' ';
        });

        json[chaveJson] = strValue.trim();
      });

      return json;
    });

    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/caged/login.html',
      { waitUntil: 'networkidle2' }
    );

    await page.setViewport({ width: 1280, height: 578 });

    await page.waitForSelector("input[name='username']");
    await page.waitForSelector('input[name="password"]');
    await page.type("input[name='username']", 'fiap');
    await page.type('input[name="password"]', 'mpsp');
    await page.waitForSelector('#btn-submit');
    await page.click('#btn-submit');

    await navigationPromise;

    await page.waitForSelector('#nav');
    await page.hover('#nav > li:nth-child(1)');
    await page.click('a[id="j_idt12:idMenuLinkEmpresaCaged"]');

    await navigationPromise;

    await page.waitForSelector('.cnpjRaizFormat');
    await page.type('.cnpjRaizFormat', this.data.cnpj);

    await navigationPromise;

    await page.waitForSelector(
      'input[id="formPesquisarEmpresaCAGED:btConsultar"]'
    );
    await page.click('input[id="formPesquisarEmpresaCAGED:btConsultar"]');

    await navigationPromise;

    await page.waitForSelector('#formResumoEmpresaCaged\\:lblCnpjRaiz');
    await page.waitForSelector('#formResumoEmpresaCaged\\:txtCnpjRaiz');
    await page.waitForSelector('#formResumoEmpresaCaged\\:lblRazaoSocial');
    await page.waitForSelector('#formResumoEmpresaCaged\\:txtRazaoSocial');
    await page.waitForSelector(
      '#formResumoEmpresaCaged\\:lblAtividadeEconomica'
    );
    await page.waitForSelector(
      '#formResumoEmpresaCaged\\:txtCodigoAtividadeEconomica'
    );
    await page.waitForSelector(
      '#formResumoEmpresaCaged\\:txtDescricaoAtividadeEconomica'
    );
    await page.waitForSelector('#formResumoEmpresaCaged\\:lblNumFiliais');
    await page.waitForSelector('#formResumoEmpresaCaged\\:txtNumFiliais');
    await page.waitForSelector('#formResumoEmpresaCaged\\:lblTotalVinculos');
    await page.waitForSelector('#formResumoEmpresaCaged\\:txtTotalVinculos');
    await page.waitForSelector('#formResumoEmpresaCaged\\:lblTotalNumPrimDia');
    await page.waitForSelector('#formResumoEmpresaCaged\\:txtTotalNumPrimDia');
    await page.waitForSelector(
      '#formResumoEmpresaCaged\\:lblTotalNumAdmissoes'
    );
    await page.waitForSelector(
      '#formResumoEmpresaCaged\\:txtTotalNumAdmissoes'
    );
    await page.waitForSelector(
      '#formResumoEmpresaCaged\\:lblTotalNumDesligamentos'
    );
    await page.waitForSelector(
      '#formResumoEmpresaCaged\\:txtTotalNumDesligamentos'
    );
    await page.waitForSelector('#formResumoEmpresaCaged\\:lblTotalNumUltDia');
    await page.waitForSelector('#formResumoEmpresaCaged\\:txtTotalNumUltDia');
    await page.waitForSelector(
      '#formResumoEmpresaCaged\\:lblTotalVariacaoAbosulta'
    );
    await page.waitForSelector(
      '#formResumoEmpresaCaged\\:txtTotalVariacaoAbosulta'
    );

    const elementosJson2 = await page.evaluate(listaValoresElement2 => {
      let json: any = {};
      listaValoresElement2 = {
        'formResumoEmpresaCaged\\:lblCnpjRaiz': [
          'formResumoEmpresaCaged\\:txtCnpjRaiz'
        ],
        'formResumoEmpresaCaged\\:lblRazaoSocial': [
          'formResumoEmpresaCaged\\:txtRazaoSocial'
        ],

        'formResumoEmpresaCaged\\:lblAtividadeEconomica': [
          'formResumoEmpresaCaged\\:txtCodigoAtividadeEconomica',
          'formResumoEmpresaCaged\\:txtDescricaoAtividadeEconomica'
        ],
        'formResumoEmpresaCaged\\:lblNumFiliais': [
          'formResumoEmpresaCaged\\:txtNumFiliais'
        ],
        'formResumoEmpresaCaged\\:lblTotalVinculos': [
          'formResumoEmpresaCaged\\:txtTotalVinculos'
        ],
        'formResumoEmpresaCaged\\:lblTotalNumPrimDia': [
          'formResumoEmpresaCaged\\:txtTotalNumPrimDia'
        ],
        'formResumoEmpresaCaged\\:lblTotalNumAdmissoes': [
          'formResumoEmpresaCaged\\:txtTotalNumAdmissoes'
        ],
        'formResumoEmpresaCaged\\:lblTotalNumDesligamentos': [
          'formResumoEmpresaCaged\\:txtTotalNumDesligamentos'
        ],
        'formResumoEmpresaCaged\\:lblTotalNumUltDia': [
          'formResumoEmpresaCaged\\:txtTotalNumUltDia'
        ],
        'formResumoEmpresaCaged\\:lblTotalVariacaoAbosulta': [
          'formResumoEmpresaCaged\\:txtTotalVariacaoAbosulta'
        ]
      };

      function limparTextoChave(textoChave: string): string {
        return textoChave
          .toLowerCase()
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

      Object.keys(listaValoresElement2).forEach((chaveHtml: string) => {
        let strValue: string = '';
        let elementoValor: any;
        let elementoStr: string;
        let chaveJson: string = '';
        let elementoChave: any = document.querySelector('#' + chaveHtml);
        chaveJson = limparTextoChave(elementoChave.outerText);

        listaValoresElement2[chaveHtml].forEach((itemValue: any) => {
          elementoValor = document.querySelector('#' + itemValue);
          elementoStr = elementoValor.outerText;

          strValue += elementoStr + ' ';
        });

        json[chaveJson] = strValue.trim();
      });

      return json;
    });

    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/caged/login.html',
      { waitUntil: 'networkidle2' }
    );

    await page.setViewport({ width: 1280, height: 578 });

    await page.waitForSelector("input[name='username']");
    await page.waitForSelector('input[name="password"]');
    await page.type("input[name='username']", 'fiap');
    await page.type('input[name="password"]', 'mpsp');
    await page.waitForSelector('#btn-submit');
    await page.click('#btn-submit');

    await navigationPromise;

    await page.waitForSelector('#nav');
    await page.hover('#nav > li:nth-child(1)');
    await page.click('a[id="j_idt12:idMenuLinkTrabalhador"]');

    await navigationPromise;

    await page.waitForSelector('#formPesquisarTrabalhador\\:txtChavePesquisa');
    await page.type('#formPesquisarTrabalhador\\:txtChavePesquisa', this.data.cnpj);

    await navigationPromise;

    await page.waitForSelector(
      'input[id="formPesquisarTrabalhador:submitPesqTrab"]'
    );
    await page.click('input[id="formPesquisarTrabalhador:submitPesqTrab"]');

    await navigationPromise;

    await page.waitForSelector('#lb2_Nome027');
    await page.waitForSelector('#txt2_Nome027');
    await page.waitForSelector('#lb1_pispasep027');
    await page.waitForSelector('#txt1_Pis028');
    await page.waitForSelector('#lb1_elos028');
    await page.waitForSelector('#txt1_elos028');
    await page.waitForSelector('#lb3_Cpf027');
    await page.waitForSelector('#txt3_Cpf027');
    await page.waitForSelector('#lb5_Ctps027');
    await page.waitForSelector('#txt5_Ctps027');
    await page.waitForSelector('#lb4_SitPis027');
    await page.waitForSelector('#txt4_SitPis027');
    await page.waitForSelector('#lb8_Nac027');
    await page.waitForSelector('#txt7_CdNac027');
    await page.waitForSelector('#txt8_Nac027');
    await page.waitForSelector('#lb12_Instr027');
    await page.waitForSelector('#txt11_CdInstr027');
    await page.waitForSelector('#txt12_Instr027');
    await page.waitForSelector('#lb13_Def027');
    await page.waitForSelector('#txt13_Def027');
    await page.waitForSelector('#lb4_datanasc027');
    await page.waitForSelector('#txt4_datanasc027');
    await page.waitForSelector('#lb6_ufctps027');
    await page.waitForSelector('#txt6_ufctps027');
    await page.waitForSelector('#lb6_Sexo027');
    await page.waitForSelector('#txt6_Sexo027');
    await page.waitForSelector('#lb10_Raca027');
    await page.waitForSelector('#txt9_CdRaca027');
    await page.waitForSelector('#txt10_Raca027');
    await page.waitForSelector('#labelEstabCep90');
    await page.waitForSelector('#txtEstabCep91');
    await page.waitForSelector('#lb26_Caged027');
    await page.waitForSelector('#txt26_Caged027');
    await page.waitForSelector('#lb27_Rais027');
    await page.waitForSelector('#txt27_Rais027');

    const elementosJson3 = await page.evaluate(listaValoresElement3 => {
      const json: any = {};

      listaValoresElement3 = {
        lb2_Nome027: ['txt2_Nome027'],
        lb1_pispasep027: ['txt1_Pis028'],
        lb1_elos028: ['txt1_elos028'],

        lb3_Cpf027: ['txt3_Cpf027'],
        lb5_Ctps027: ['txt5_Ctps027'],
        lb4_SitPis027: ['txt4_SitPis027'],
        lb8_Nac027: ['txt7_CdNac027', 'txt8_Nac027'],
        lb12_Instr027: ['txt11_CdInstr027', 'txt12_Instr027'],
        lb13_Def027: ['txt13_Def027'],

        lb4_datanasc027: ['txt4_datanasc027'],
        lb6_ufctps027: ['txt6_ufctps027'],
        lb6_Sexo027: ['txt6_Sexo027'],
        lb10_Raca027: ['txt9_CdRaca027', 'txt10_Raca027'],
        labelEstabCep90: ['txtEstabCep91'],

        lb26_Caged027: ['txt26_Caged027'],
        lb27_Rais027: ['txt27_Rais027']
      };

      function limparTextoChave(textoChave: string): string {
        return textoChave
          .toLowerCase()
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
          .replace('1_dia', 'primeiro_dia')
          .replace('é', 'e');
      }

      Object.keys(listaValoresElement3).forEach((chaveHtml: string) => {
        let strValue: string = '';
        let elementoValor: any;
        let elementoStr: string;
        let chaveJson: string = '';
        const elementoChave: any = document.querySelector('#' + chaveHtml);
        chaveJson = limparTextoChave(elementoChave.outerText);

        listaValoresElement3[chaveHtml].forEach((itemValue: any) => {
          elementoValor = document.querySelector('#' + itemValue);
          elementoStr = elementoValor.outerText;

          strValue += elementoStr + ' ';
        });

        json[chaveJson] = strValue.trim();
      });

      return json;
    });

    await navigationPromise;

    return [elementosJson, elementosJson2, elementosJson3];
  }
}
