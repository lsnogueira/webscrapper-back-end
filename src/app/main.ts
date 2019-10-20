import puppetteer = require('puppeteer');
import {
  SivecProvider,
  SielProvider,
  CagedProvider,
  CadespProvider,
  ArpenpProvider,
  InfocrimProvider,
  JucespProvider
} from './providers';

(async () => {
  const browser = await puppetteer.launch({
    headless: false,
    args: ['--full-screen',"--disable-notifications"]
    
  });

  const page = await browser.newPage();
  const jucesp = new JucespProvider(page);
  jucesp.jucespPage();
})();
