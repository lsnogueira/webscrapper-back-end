import puppeteer = require('puppeteer');
import { mainLogin } from '../globals';
import { CensecPartesModel } from '../../core/domain/entity/censec-partes-model';
import { CensecCartorioDadosModel } from '../../core/domain/entity/censec-cartorio-dados-model';

export class CensecProvider {
  public browser: puppeteer.Browser;
  private result: any;
  private page: puppeteer.Page;

  constructor(private body: any) {}

  public async censecPage(): Promise<any> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--full-screen', '--disable-notifications']
    });

    this.page = await this.browser.newPage();

    return mainLogin(this.page).then(
      (pageNova: puppeteer.Page) => {
        return this.irPaginaCensec(pageNova);
      },
      (error) => console.error(error)
    );
  }

  private async irPaginaCensec(page: puppeteer.Page): Promise<any> {
    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/censec/login.html',
      { waitUntil: 'networkidle2' }
    );

    const navigationPromise = page.waitForNavigation();

    await page.waitForSelector('#CaixaLogin > #FlagLogin #EntrarButton');
    await page.click('#CaixaLogin > #FlagLogin #EntrarButton');

    await navigationPromise;
    await page.waitForSelector('#ctl00_CESDIConsultaAtoHyperLink');
    await page.evaluate(() => {
      (document.getElementById(
        'ctl00_CESDIConsultaAtoHyperLink'
      ) as HTMLElement).click();
    });

    await navigationPromise;

    await page.waitForSelector(
      '.AreaFormulario #ctl00_ContentPlaceHolder1_DocumentoTextBox'
    );
    await page.waitForSelector(
      '#ctl00_ContentPlaceHolder1_DocumentoTextBox'
    );
    await page.type('#ctl00_ContentPlaceHolder1_DocumentoTextBox', this.body.cpf ? this.body.cpf : '11111111111');
    await page.click(
      '.AreaFormulario #ctl00_ContentPlaceHolder1_DocumentoTextBox'
    );

    await page.waitForSelector(
      '.InternaAbas #ctl00_ContentPlaceHolder1_BuscarButton'
    );
    await page.click('.InternaAbas #ctl00_ContentPlaceHolder1_BuscarButton');

    await navigationPromise;

    await page.waitForSelector(
      'table > tbody > .linha1Tabela:nth-child(2) > td > input'
    );
    await page.click('table > tbody > .linha1Tabela:nth-child(2) > td > input');

    await page.waitForSelector(
      '#ctl00_ContentPlaceHolder1_ResultadoBuscaGeralPanel #ctl00_ContentPlaceHolder1_VisualizarButton'
    );
    await page.click(
      '#ctl00_ContentPlaceHolder1_ResultadoBuscaGeralPanel #ctl00_ContentPlaceHolder1_VisualizarButton'
    );

    await navigationPromise;

    await page.waitForSelector(
      '.Conteudo > .InternaAbas > .AreaFormulario > .CampoSimples:nth-child(1) > span'
    );

    await page.waitForSelector(
      '.InternaAbas #ctl00_ContentPlaceHolder1_CodigoTextBox'
    );
    await page.click('.InternaAbas #ctl00_ContentPlaceHolder1_CodigoTextBox');

    await page.waitForSelector(
      '.Conteudo > .InternaAbas > .AreaFormulario:nth-child(4) > .CampoSimples:nth-child(2) > span'
    );
    await page.click(
      '.Conteudo > .InternaAbas > .AreaFormulario:nth-child(4) > .CampoSimples:nth-child(2) > span'
    );

    await page.waitForSelector(
      '.Conteudo > .InternaAbas > .AreaFormulario:nth-child(4) > .CampoSimples:nth-child(2) > span'
    );
    await page.click(
      '.Conteudo > .InternaAbas > .AreaFormulario:nth-child(4) > .CampoSimples:nth-child(2) > span'
    );

    await page.waitForSelector(
      '.Conteudo > .InternaAbas > .AreaFormulario:nth-child(4) > .CampoSimples:nth-child(2) > div'
    );
    await page.click(
      '.Conteudo > .InternaAbas > .AreaFormulario:nth-child(4) > .CampoSimples:nth-child(2) > div'
    );

    await page.waitForSelector(
      '.Geral > .Centraliza > .Conteudo > .InternaAbas > .AreaFormulario:nth-child(4)'
    );
    await page.click(
      '.Geral > .Centraliza > .Conteudo > .InternaAbas > .AreaFormulario:nth-child(4)'
    );

    await page.waitForSelector(
      '.Conteudo > .InternaAbas > .AreaFormulario > .CampoSimples:nth-child(3) > span'
    );
    await page.click(
      '.Conteudo > .InternaAbas > .AreaFormulario > .CampoSimples:nth-child(3) > span'
    );

    await page.waitForSelector(
      '.Geral > .Centraliza > .Conteudo > .InternaAbas > .AreaFormulario:nth-child(4)'
    );
    await page.click(
      '.Geral > .Centraliza > .Conteudo > .InternaAbas > .AreaFormulario:nth-child(4)'
    );

    await page.waitForSelector('.Listview > table');
    await page.waitForSelector(
      '#ctl00_ContentPlaceHolder1_DadosCartorio_DivTelefonesCartorioListView > table'
    );

    const partesContent = await page.evaluate(() => {
      const names = [];
      const documents = [];
      const quality = [];
      const partes: CensecPartesModel[] = [];

      const table = document.querySelectorAll(
        '#ctl00_ContentPlaceHolder1_PartesUpdatePanel > table > tbody'
      );

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < table[0].children.length; i++) {
        const element = table[0].children[i] as HTMLTableRowElement;
        names.push(element.cells[1].innerText);
        documents.push(element.cells[2].innerText);
        quality.push(element.cells[3].innerText);
        partes.push({ nome: '', documento: '', qualidade: '' });
      }
      names.map((name: string, index: number) => {
        partes[index].nome = name;
      });
      documents.map((doc: string, index: number) => {
        partes[index].documento = doc;
      });
      quality.map((value: string, index: number) => {
        partes[index].qualidade = value;
      });

      return partes;
    });

    const dadosCartorioContent = await page.evaluate(() => {
      const tel = [];
      const tipo = [];
      const ramal = [];
      const contato = [];
      const status = [];
      const dadosCartorio: CensecCartorioDadosModel[] = [];

      const table = document.querySelectorAll(
        '#ctl00_ContentPlaceHolder1_DadosCartorio_DivTelefonesCartorioListView > .rolagem > table > tbody'
      );
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < table[0].children.length; i++) {
        const element = table[0].children[i] as HTMLTableRowElement;
        dadosCartorio.push({
          contato: '',
          telefone: '',
          ramal: '',
          status: '',
          tipo: ''
        });
        tel.push(element.cells[0].innerText);
        tipo.push(element.cells[1].innerText);
        ramal.push(element.cells[2].innerText);
        contato.push(element.cells[3].innerText);
        status.push(element.cells[4].innerText);
      }

      tel.map((value: string, index: number) => {
        dadosCartorio[index].telefone = value;
      });
      tipo.map((value: string, index: number) => {
        dadosCartorio[index].tipo = value;
      });
      ramal.map((value: string, index: number) => {
        dadosCartorio[index].ramal = value;
      });
      contato.map((value: string, index: number) => {
        dadosCartorio[index].contato = value;
      });
      status.map((value: string, index: number) => {
        dadosCartorio[index].status = value;
      });
      return dadosCartorio;
    });

    this.result = {
      partes: partesContent,
      dadosCartorio: dadosCartorioContent
    };
    return this.result;
  }
}
