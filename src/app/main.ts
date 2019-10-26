import puppetteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
import {PdfMaker} from './pdfMaker'

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





(async () => {
    var pdfMaker = new PdfMaker()
    var json ={
      "arpenp": {
        "cartorio_id": "110",
        "busca_juiz_id": "1997333",
        "tipo_registro": "C",
        "nome_registrado_1": "Antonio TORRES Coutinho",
        "nome_registrado_2": "Ellen MARCIA FERNANDES SILVEIRA",
        "novo_nome_registrado_1": "",
        "novo_nome_registrado_2": "Ellen MARCIA FERNANDES SILVEIRA Coutinho",
        "data_ocorrido": "19/03/2015",
        "data_registro": "19/03/2015",
        "num_livro": "00133",
        "num_folha": "237",
        "num_registro": "0039194",
        "matricula": "11914901552015200133237003919491",
        "nome_requerente": "Antonio Torres Coutinho",
        "documento_requerente": "",
        "telefone_requerente": "(11) 3119-7142"
      },
      "tipoConsulta": "Processo"
    }
    var documento = new PDFDocument
    documento.pipe(fs.createWriteStream("output.pdf"))
    pdfMaker.construirPdfProcesso(json, documento)
    
})();

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