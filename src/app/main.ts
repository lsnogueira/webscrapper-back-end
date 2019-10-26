import puppetteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;
import {
  SivecProvider,
  SielProvider,
  CagedProvider,
  CadespProvider,
  ArpenpProvider,
  ArispProvider,
  InfocrimProvider,
  JucespProvider,
  DetranProvider,
  CensecProvider

} from './providers';



// (async () => {
//   const browser = await puppetteer.launch({
//     headless: true,
//     args: ['--full-screen', '--disable-notifications']
//   });

//   const page = await browser.newPage();
//   page.setDefaultNavigationTimeout(0);
//   const aris = new ArispProvider(page, browser);
//   aris.arispPage();
// })();

export class Main {
  private client: any
  constructor(){
    const uri = "mongodb+srv://usuariompsp:usuariompsp@cluster0-limay.mongodb.net/test?retryWrites=true&w=majority";
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  public async buscaCivil(): Promise<any>{
    var jsonMaster: any = {}
    const censec = new CensecProvider()
    const siel = new SielProvider()
    const sivec = new SivecProvider()

    const censecDados = await censec.censecPage().then((jsonReturned) => jsonReturned).finally(()=>{censec.browser.close()})
    const sielDados = await siel.sielPage().then((jsonReturned) => jsonReturned).finally(()=>{siel.browser.close()})
    const sivecDados = await sivec.sivecPage().then((jsonReturned) => jsonReturned).finally(()=>{sivec.browser.close()})

    jsonMaster = {
      "censec": censecDados,
      "siel": sielDados,
      "sivec": sivecDados,
       tipoConsulta: "Civil"
    };
    await this.client.connect((err:any) => {
      console.log(err)
      const collection = this.client.db("mpsp").collection("consultas");
      // perform actions on the collection object
      collection.insertOne(jsonMaster);
      console.log("Salvei")
      this.client.close();
    });
  

    return jsonMaster;
  }

  public async buscaJuridica(): Promise<any>{
    /*cadesp,caged,censec e jucesp */
    var jsonMaster: any = {}
    const cadesp = new CadespProvider()
    const caged = new CagedProvider()
    const censec = new CensecProvider()
    const jucesp = new JucespProvider()

    const cadespDados = await cadesp.cadespPage().then((jsonReturned) => jsonReturned).finally(()=>{cadesp.browser.close()})
    const cagedDados = await caged.cagedPage().then((jsonReturned) => jsonReturned).finally(()=>{caged.browser.close()})
    const censecDados = await censec.censecPage().then((jsonReturned) => jsonReturned).finally(()=>{censec.browser.close()})
    const jucespDados = await jucesp.jucespPage().then((jsonReturned) => jsonReturned).finally(()=>{jucesp.browser.close()})

    jsonMaster = {
      "cadesp": cadespDados,
      "caged": cagedDados,
      "censec": censecDados,
      "jucesp": jucespDados,
      tipoConsulta: "Juridica"
    };

    await this.client.connect((err:any) => {
      console.log(err)
      const collection = this.client.db("mpsp").collection("consultas");
      // perform actions on the collection object
      collection.insertOne(jsonMaster);
      console.log("Salvei")
      this.client.close();
    });

    return jsonMaster;
  }

  public async buscaProcesso(): Promise<any>{
    /* Arpenp */
    var jsonMaster: any = {}
    const arpenp = new ArpenpProvider()
    const arpenpDados = await arpenp.arpenpPage().then((jsonReturned) => jsonReturned).finally(()=>{arpenp.browser.close()})
    
    jsonMaster = {
      "arpenp": arpenpDados,
      tipoConsulta: "Processo"
    };

    await this.client.connect((err:any) => {
      console.log(err)
      const collection = this.client.db("mpsp").collection("consultas");
      // perform actions on the collection object
      collection.insertOne(jsonMaster);
      console.log("Salvei")
      this.client.close();
    });

    return jsonMaster;

  }


  public async buscaCriminal(): Promise<any>{
    /* Infocrim */
    var jsonMaster: any = {}
    const infocrim = new InfocrimProvider()
    const infocrimDados = await infocrim.infocrimPage().then((jsonReturned) => jsonReturned).finally(()=>{infocrim.browser.close()})
    
    jsonMaster = {
      "infocrim": infocrimDados,
      tipoConsulta:"Criminal",
    };

    await this.client.connect((err:any) => {
      console.log(err)
      const collection = this.client.db("mpsp").collection("consultas");
      // perform actions on the collection object
      collection.insertOne(jsonMaster);
      console.log("Salvei")
      this.client.close();
    });

    return jsonMaster;
  }



}