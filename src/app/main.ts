import puppetteer = require('puppeteer');
import {
  SivecProvider,
  SielProvider,
  CagedProvider,
  CadespProvider,
  ArpenpProvider,
  InfocrimProvider
} from './providers';

(async () => {
  const browser = await puppetteer.launch({
    headless: false,
    args: ['--full-screen']
  });

  const page = await browser.newPage();
  const infocrim = new InfocrimProvider(page);
  infocrim.infocrimPage();
})();
