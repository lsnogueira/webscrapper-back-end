import puppeteer = require('puppeteer');
import { PATH, getFormatDate, mainLogin } from '../globals';

const data = {
  user: 'fiap',
  password: 'mpsp',
  cpf: '01036642895',
  urlLogin: 'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/login'
};

export class ArispProvider {
  constructor(
    private page: puppeteer.Page,
    private browser: puppeteer.Browser
  ) {}

  public async arispPage(): Promise<void> {
    mainLogin(this.page).then(
      (page: puppeteer.Page) => {
        this.irPaginaArisp(page, this.browser);
      }, () =>
      console.error('Erro de login')
      );
  }

  public async irPaginaArisp(page: puppeteer.Page, browser: puppeteer.Browser): Promise<void> {
    await page.goto(
      'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/arisp/login.html',
      { waitUntil: 'networkidle2' }
    );

    const navigationPromise = page.waitForNavigation();
    await page.waitForSelector('.row #btnCallLogin');
    await page.waitForSelector(
      'body > #AssinaturaDigital > #ICPBravoLogin #btnAutenticar'
    );

    await page.click('.row #btnCallLogin');
    await page.click(
      'body > #AssinaturaDigital > #ICPBravoLogin #btnAutenticar'
    );

    await page.waitForSelector('#liInstituicoes');

    await page.hover('#liInstituicoes');

    await page.waitForSelector(
      '#liInstituicoes > .submenu-wrap > .menu > li:nth-child(3) > a'
    );
    await page.click(
      '#liInstituicoes > .submenu-wrap > .menu > li:nth-child(3) > a'
    );

    await navigationPromise;

    await page.waitForSelector('#main #Prosseguir');
    await page.click('#main #Prosseguir');

    await navigationPromise;

    await page.waitForSelector(
      '.list-wrap > .col-xs-12 > .selectorAll > .checkbox > input'
    );
    await page.click(
      '.list-wrap > .col-xs-12 > .selectorAll > .checkbox > input'
    );

    await page.waitForSelector('#chkHabilitar');

    await page.evaluate(() => {
      (document.getElementById('chkHabilitar') as HTMLInputElement).click();
    });

    await page.waitForSelector('#main #Prosseguir');
    await page.click('#main #Prosseguir');

    await navigationPromise;

    await page.waitForSelector('.form-default #filterDocumento');
    await page.type('.form-default #filterDocumento', '123456789');

    await page.waitForSelector('.form-default #btnPesquisar');
    await page.click('.form-default #btnPesquisar');

    await navigationPromise;

    await page.waitForSelector(
      '#resultados > #panelBDLight > tr:nth-child(1) > .check > .flex'
    );
    await page.click(
      '#resultados > #panelBDLight > tr:nth-child(1) > .check > .flex'
    );

    await page.waitForSelector('#panelBDLight > tr:nth-child(1) #chk339');
    await page.click('#panelBDLight > tr:nth-child(1) #chk339');

    await page.waitForSelector('#panelBDLight > tr:nth-child(2) #chk7');
    await page.click('#panelBDLight > tr:nth-child(2) #chk7');

    await page.waitForSelector('#panelBDLight > tr:nth-child(3) #chk10');
    await page.click('#panelBDLight > tr:nth-child(3) #chk10');

    await page.waitForSelector('#panelBDLight > tr:nth-child(4) #chk18');
    await page.click('#panelBDLight > tr:nth-child(4) #chk18');

    await page.waitForSelector('#btnProsseguir');
    await page.evaluate(() => {
      (document.getElementById('btnProsseguir') as HTMLElement).click();
    });

    await navigationPromise;

    let pageTarget = page.target();

    await page.waitForSelector(
      '#matriculas > #panelMatriculas > tr:nth-child(2) > td > .list'
    );
    await page.click(
      '#matriculas > #panelMatriculas > tr:nth-child(2) > td > .list'
    );
    let newTarget = await browser.waitForTarget(
      (target) => target.opener() === pageTarget
    );
    const imgPage = await newTarget.page();
    await imgPage.waitForSelector('body');

    pageTarget = page.target();

    await imgPage.waitForSelector('body > a > img');
    await imgPage.click('body > a > img');

    newTarget = await browser.waitForTarget(
      (target) => target.opener() === pageTarget
    );

    const docPage = await newTarget.page();
    await docPage.waitForNavigation({waitUntil: 'load'});

    docPage.setDefaultNavigationTimeout(0);
    await docPage.pdf({
        path: `${PATH.pdf}solicitacao-${data.cpf}-${getFormatDate()}.pdf`,
        format: 'A4'
    });
  }
}
