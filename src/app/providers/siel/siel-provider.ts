import puppeteer = require('puppeteer');
import { mainLogin } from '../globals';

export class SielProvider {
  public browser: puppeteer.Browser;
  private result: any;
  private page: puppeteer.Page;

  constructor(private data: any) {}

  public async sielPage(): Promise<any> {

    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--full-screen', '--disable-notifications']
    });

    this.page = await this.browser.newPage();

    return mainLogin(this.page).then(
      (pageNova: puppeteer.Page) => {
        return this.irPaginaSiel(pageNova)
      },
      (error) => console.error(error)
    );
  }

  private async irPaginaSiel(page: puppeteer.Page): Promise<any> {
    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/siel/login.html',
      { waitUntil: 'networkidle2' }
    );
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1280, height: 578 });

    await page.waitForSelector("input[name='usuario']");
    await page.waitForSelector('input[name="senha"]');
    await page.type("input[name='usuario']", 'fiap');
    await page.type('input[name="senha"]', 'mpsp');
    await page.waitForSelector('input[type="submit"]');
    await page.click('input[type="submit"]');

    await navigationPromise;

    await page.waitForSelector('input[name="num_processo"]');
    await page.waitForSelector('input[name="nome"]');
    await page.type("input[name='num_processo']", this.data.numero_processo);
    await page.type("input[name='nome']", this.data.nome);

    await page.waitForSelector('table > tbody > tr > td > .img');
    await page.click('table > tbody > tr > td > .img');

    await navigationPromise;

    await page.waitForSelector("table[class='lista'] > tbody");
    const elementosJson = await page.evaluate(() => {
      let elemento: any = document.querySelector(
        "table[class='lista'] > tbody"
      );
      elemento = elemento.children;

      const dadosFiltrados: any = Array.prototype.filter.call(
        elemento,
        (item: any) => {
          if (item.children.length > 1) {
            return true;
          }
          return false;
        }
      );

      const dadosTd: any = Array.prototype.map.call(
        dadosFiltrados,
        (item: any) => {
          return [
            item.children[0].outerText
              .toLowerCase()
              .replace('.', '')
              .replace(' ', '_')
              .replace('ç', 'c')
              .replace('ó', 'o')
              .replace('í', 'i')
              .replace('ã', 'a'),
            item.children[1].outerText
          ];
        }
      );
      const jsonRetorno: any = {};
      dadosTd.forEach((item: string[]) => {
        jsonRetorno[item[0]] = item[1];
      });

      return jsonRetorno;
    });

    return elementosJson;
  }
}
