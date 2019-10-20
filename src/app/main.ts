import puppetteer = require('puppeteer');
import {
  SivecProvider,
  SielProvider,
  CagedProvider,
  CadespProvider,
  ArpenpProvider,
  ArispProvider,
  InfocrimProvider,
  JucespProvider,
  CensecProvider
} from './providers';

(async () => {
  const browser = await puppetteer.launch({
    headless: false,
    args: ['--full-screen', '--disable-notifications']
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  const censec = new CensecProvider(page);
  censec.censecPage();
})();
