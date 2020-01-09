import puppetteer = require('puppeteer');
import { mainLogin } from '..';
import { json } from 'body-parser';

const data = {
  numero_processo: '11111111111111'
};

export class DetranProvider {
  constructor(private page: puppetteer.Page) {}

  public async detranPage(): Promise<void> {
    mainLogin(this.page).then(this.irPaginaDetran, () =>
      console.error('Erro de login')
    );
  }

  private async irPaginaDetran(page: puppetteer.Page): Promise<void> {

    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/detran/login.html',
      { waitUntil: 'networkidle2' }
    );
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1280, height: 578 });

    await page.waitForSelector("#form\\:j_id563205015_44efc1ab")
    await page.type("#form\\:j_id563205015_44efc1ab", "111111111")
    await page.waitForSelector("#form\\:j_id563205015_44efc191")
    await page.type("#form\\:j_id563205015_44efc191", "123456")

    await page.waitForSelector("#form\\:j_id563205015_44efc15b")
    await page.click("#form\\:j_id563205015_44efc15b")

    await navigationPromise;

    await page.waitForSelector("#navigation_li_M_16")
    await page.hover("#navigation_li_M_16")

    await page.waitForSelector("#navigation_a_F_16")
    await page.click("#navigation_a_F_16")

    await navigationPromise

    await page.waitForSelector("#form\\:cpf")
    await page.type("#form\\:cpf", "1111111")

    await page.waitForSelector("a.botao")
    await page.click("a.botao")

     await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/detran/login.html',
      { waitUntil: 'networkidle2' }
    );
    

    await page.setViewport({ width: 1280, height: 578 });

    

    await page.waitForSelector("#form\\:j_id563205015_44efc1ab")
    await page.type("#form\\:j_id563205015_44efc1ab", "111111111")
    await page.waitForSelector("#form\\:j_id563205015_44efc191")
    await page.type("#form\\:j_id563205015_44efc191", "123456")

    await page.waitForSelector("#form\\:j_id563205015_44efc15b")
    await page.click("#form\\:j_id563205015_44efc15b")

    await navigationPromise

    await page.waitForSelector("#navigation_li_M_16")
    await page.hover("#navigation_li_M_16")

    await page.waitForSelector("#navigation_ul_M_16 > li:nth-child(2)")
    await page.click("#navigation_ul_M_16 > li:nth-child(2)")

    await navigationPromise

    await page.waitForSelector("#form\\:cpf")
    await page.type("#form\\:cpf", "1111111")

    await page.waitForSelector("a.botao")
    await page.click("a.botao")

    await navigationPromise

  }
}
