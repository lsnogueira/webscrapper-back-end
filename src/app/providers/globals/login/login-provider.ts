import puppetteer = require('puppeteer');

const data = {
  user: 'fiap',
  password: 'mpsp',
  urlLogin: 'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/login'
};

export async function mainLogin(page: puppetteer.Page): Promise<puppetteer.Page> {

  await page.goto(data.urlLogin, { waitUntil: 'networkidle2' });

  const navigationPromise = page.waitForNavigation();

  await page.waitForSelector('body #username');
  await page.waitForSelector('body #password');
  await page.waitForSelector('body > .container > .form-signin > .btn');

  await page.type('body #username', 'fiap');
  await page.type('body #password', 'mpsp');
  await page.click('body > .container > .form-signin > .btn');

  await navigationPromise;

  return page;

}
