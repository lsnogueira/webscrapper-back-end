import puppeteer = require('puppeteer');
import { mainLogin } from '..';

export class InfocrimProvider {
  public browser: puppeteer.Browser;
  private page: puppeteer.Page;

  constructor() {}

  public async infocrimPage(): Promise<any> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--full-screen', '--disable-notifications']
    });

    this.page = await this.browser.newPage();

    return mainLogin(this.page).then(
      (pageNova: puppeteer.Page) => {
        return this.irPaginaInfocrim(pageNova);
      },
      error => console.error(error)
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

    await navigationPromise;

    await page.setViewport({ width: 1280, height: 578 });

    await page.waitForSelector('tbody > tr:nth-child(2) > td > a > img');
    await page.click('tbody > tr:nth-child(2) > td > a > img');

    await navigationPromise;

    await page.waitForSelector('tr #enviar');
    await page.click('tr #enviar');

    await navigationPromise;

    await page.waitForSelector(
      'table > tbody > tr:nth-child(2) > .linhaDet > a'
    );
    await page.click('table > tbody > tr:nth-child(2) > .linhaDet > a');

    await navigationPromise;

    await page.waitForSelector('pre');

    const elementosJson = await page.evaluate(() => {
      const limparTextoChave = (textoChave: string): string => {
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
      };

      let valoresSplitados: any = [];
      let dictChaveValor;
      const valoresPagina: any = (document as any).querySelector('pre').outerText;
      valoresSplitados = valoresPagina.split('\n');

      valoresSplitados = valoresSplitados.filter((item: any) => {
        return item.trim() != '';
      });

      dictChaveValor = valoresSplitados.map((item: any) => {
        const posicao = item.indexOf(':');
        if (posicao == -1) {
          return { tituloRelatorio: item };
        }
        const dictReturn: any = {};
        const chave = limparTextoChave(item.substring(0, posicao).trim());
        const valor = item.substring(posicao + 1, item.length).trim();
        dictReturn[chave] = valor;
        return dictReturn;
      });

      const jsonRetornoConsertado: any = {};
      dictChaveValor.forEach((item: any) => {
        Object.keys(item).forEach(chave => {
          jsonRetornoConsertado[chave] = item[chave];
        });
      });
      return jsonRetornoConsertado;
    });
    console.log(elementosJson);
    return elementosJson;
  }
}
