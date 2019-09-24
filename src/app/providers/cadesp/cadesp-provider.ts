import puppetteer = require('puppeteer');
import { mainLogin } from '../barrel';

const data = {
  user: 'fiap',
  password: 'mpsp',
  urlLogin: 'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/login'
};

export async function cadespPage(page: puppetteer.Page): Promise<void> {


  mainLogin(page).then(irPaginaCadesp, (error) => {
    console.log("Deu erro")
  });

}


async function irPaginaCadesp(page: puppetteer.Page): Promise<void> {
    console.log("ESTOU INDO AQUI")
    await page.goto("http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/cadesp/login.html", { waitUntil: 'networkidle2' });
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1280, height: 578 });

    await page.waitForSelector('body #ctl00_conteudoPaginaPlaceHolder_loginControl_UserName');
    await page.waitForSelector('body #ctl00_conteudoPaginaPlaceHolder_loginControl_Password');
    await page.waitForSelector('body #ctl00_conteudoPaginaPlaceHolder_loginControl_loginButton');

    await page.type('body #ctl00_conteudoPaginaPlaceHolder_loginControl_UserName', 'fiap');
    await page.type('body #ctl00_conteudoPaginaPlaceHolder_loginControl_Password', 'mpsp');
    await page.click('body #ctl00_conteudoPaginaPlaceHolder_loginControl_loginButton');

    await navigationPromise;

    await page.waitForSelector('#aspnetForm > .conteudoGeral > tbody > tr > .conteudoPrincipal')
    await page.click('#aspnetForm > .conteudoGeral > tbody > tr > .conteudoPrincipal')

    await page.hover('body #ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperiorn1');
    //await page.waitFor(10)

    await page.hover('body .ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_1.menuSuperiorLevel1.ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_6')
    await page.waitForSelector('.ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_19 > tbody > tr > td > .ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_1')
    await page.click('.ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_19 > tbody > tr > td > .ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperior_1')
    
    await navigationPromise;
    
    

}
  