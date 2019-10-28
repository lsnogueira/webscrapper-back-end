import puppeteer = require('puppeteer');
import { mainLogin } from '../globals';

const matriculaSap = '213213213';

export class SivecProvider {
  public browser: puppeteer.Browser;
  private result: any;
  private page: puppeteer.Page;

  constructor(private data: any) {}

  public async sivecPage(): Promise<any> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--full-screen', '--disable-notifications']
    });

    this.page = await this.browser.newPage();

    return mainLogin(this.page).then(
      (pageNova: puppeteer.Page) => {
        return this.irPaginaSivec(pageNova)
      },
      (error) => console.error(error)
    );
  }

  private async irPaginaSivec(page: puppeteer.Page): Promise<any> {
    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/sivec/login.html',
      { waitUntil: 'networkidle2' }
    );
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1280, height: 578 });
    await page.waitForSelector("input[name='nomeusuario']");
    await page.waitForSelector('input[name="senhausuario"]');
    await page.type("input[name='nomeusuario']", 'fiap');
    await page.type('input[name="senhausuario"]', 'mpsp');
    await page.waitForSelector('input[type="submit"]');
    await page.click('input[name="Acessar"]');

    await navigationPromise;

    await page.waitForSelector(
      '.navbar > #navbar-collapse-1 > .nav > .dropdown:nth-child(4) > a'
    );
    await page.click(
      '.navbar > #navbar-collapse-1 > .nav > .dropdown:nth-child(4) > a'
    );

    await page.waitFor(300);

    await page.waitForSelector('ul[role="menu"] > li > a[id="1"]');
    await page.click('ul[role="menu"] > li > a[id="1"]');

    await page.waitFor(300);

    // PARA RETIRAR ESSE GATO PRECISA ARRUMAR O WEBSCRAPPING
    if (this.data.rg !== '' && false) {
      await page.waitForSelector(
        '.dropdown-menu > .open > .dropdown-menu > li:nth-child(1) > a'
      );
      await page.click(
        '.dropdown-menu > .open > .dropdown-menu > li:nth-child(1) > a'
      );
      await page.waitForSelector('input[id="idValorPesq"]');
      await page.type('input[id="idValorPesq"]', this.data.rg);
      await page.waitForSelector('input[id="procura"]');
      await page.click('input[id="procura"]');
      await page.waitForSelector(
        '.dropdown-menu > .open > .dropdown-menu > li:nth-child(3) > a'
      );
      await page.click(
        '.dropdown-menu > .open > .dropdown-menu > li:nth-child(3) > a'
      );
      await page.waitForSelector('input[id="idValorPesq"]');
      await page.type('input[id="idValorPesq"]', matriculaSap);
      await page.waitForSelector('input[id="procurar"]');
      await page.click('input[id="procurar"]');
    } else if (this.data.nome !== '') {
      await page.waitForSelector(
        '.dropdown-menu > .open > .dropdown-menu > li:nth-child(2) > a'
      );
      await page.click(
        '.dropdown-menu > .open > .dropdown-menu > li:nth-child(2) > a'
      );
      await page.waitForSelector('input[id="idNomePesq"]');
      await page.type('input[id="idNomePesq"]', this.data.nome);
      await page.waitForSelector('input[id="procura"]');
      await page.click('input[id="procura"]');
    }

    await navigationPromise;
    await page.waitForSelector(
      '#tabelaPesquisa > tbody > .odd:nth-child(1) > .textotab1 > .textotab1'
    );
    await page.click(
      '#tabelaPesquisa > tbody > .odd:nth-child(1) > .textotab1 > .textotab1'
    );
    await navigationPromise;

    await page.waitForSelector('.container > .row > div > .textotab2');
    await page.waitForSelector('.table.compact > tbody > tr');

    await page.waitFor(300);
    const elementosJson = await page.evaluate(() => {
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
          .replace('ã', 'a');
      }

      const elementosTr = document.querySelectorAll(
        '.table.compact > tbody > tr'
      );
      const elementosTd = Array.prototype.map.call(
        elementosTr,
        item => item.children
      );
      console.log('ESTOU AQUI');

      const elementosFiltrados = Array.prototype.map.call(elementosTd, item => {
        return Array.prototype.filter.call(item, iTd => {
          if (iTd.outerHTML == '<td></td>') {
            return false;
          }
          return true;
        });
      });

      console.log(elementosFiltrados);

      const elementosStr = Array.prototype.map.call(
        elementosFiltrados,
        item => {
          return Array.prototype.map.call(item, iText => {
            return iText.outerText;
          });
        }
      );

      console.log(elementosStr);

      const json: any = {};

      elementosStr.forEach((item: any) => {
        json[limparTextoChave(item[0])] = item[1];
        json[limparTextoChave(item[2])] = item[3];
      });
      console.log('CONSTRUINDO O JSON');
      console.log(json);

      const elementosTx = document.querySelectorAll(
        '.container > .row > div > .textotab2'
      );
      const elementosDiv = Array.prototype.map.call(
        elementosTx,
        item => item.parentElement.parentElement
      );
      const elementosC = Array.prototype.map.call(
        elementosDiv,
        item => item.children
      );
      const elementosOuterText = Array.prototype.map.call(elementosC, item => [
        item[0].outerText,
        item[1].outerText
      ]);

      elementosOuterText.forEach((item: any) => {
        json[limparTextoChave(item[0])] = item[1];
      });

      return json;
    });

    return elementosJson;
  }
}
