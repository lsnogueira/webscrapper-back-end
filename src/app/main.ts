import puppetteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
import { PdfMaker } from './pdfMaker';

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

export class Main {
  private client: any;

  constructor() {
    const uri =
      'mongodb+srv://usuariompsp:usuariompsp@cluster0-limay.mongodb.net/test?retryWrites=true&w=majority';
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  public async buscaCivil(body: any): Promise<any> {
    let jsonMaster = {};

    const censec = new CensecProvider(body);
    const siel = new SielProvider(body);
    const sivec = new SivecProvider(body);

    const censecDados = await censec
      .censecPage()
      .then((jsonReturned) => jsonReturned)
      .finally(() => {
        censec.browser.close();
      });
    const sielDados = await siel
      .sielPage()
      .then((jsonReturned) => jsonReturned)
      .finally(() => {
        siel.browser.close();
      });
    const sivecDados = await sivec
      .sivecPage()
      .then((jsonReturned) => jsonReturned)
      .finally(() => {
        sivec.browser.close();
      });
    jsonMaster = {
      censec: censecDados,
      siel: sielDados,
      sivec: sivecDados,
      tipoConsulta: 'Civil',
      dataConsulta: await this.getDatetime()
    };
    await this.client.connect(() => {
      const collection = this.client.db('mpsp').collection('consultas');
      collection.insertOne(jsonMaster);
      console.log('Consulta salva na collection');
      this.client.close();
    });

    return jsonMaster;
  }

  public async buscaJuridica(body: any): Promise<any> {
    let jsonMaster: any = {};
    const cadesp = new CadespProvider(body);
    const caged = new CagedProvider(body);
    const censec = new CensecProvider(body);
    const jucesp = new JucespProvider(body);

    const cadespDados = await cadesp
      .cadespPage()
      .then(jsonReturned => jsonReturned)
      .finally(() => {
        cadesp.browser.close();
      });
    const cagedDados = await caged
      .cagedPage()
      .then(jsonReturned => jsonReturned)
      .finally(() => {
        caged.browser.close();
      });
    const censecDados = await censec
      .censecPage()
      .then(jsonReturned => jsonReturned)
      .finally(() => {
        censec.browser.close();
      });
    const jucespDados = await jucesp
      .jucespPage()
      .then(jsonReturned => jsonReturned)
      .finally(() => {
        jucesp.browser.close();
      });

    jsonMaster = {
      cadesp: cadespDados,
      caged: cagedDados,
      censec: censecDados,
      jucesp: jucespDados,
      tipoConsulta: 'Juridica',
      dataConsulta: await this.getDatetime()
    };

    await this.client.connect(() => {
      const collection = this.client.db('mpsp').collection('consultas');
      collection.insertOne(jsonMaster);
      console.log('Consulta salva na collection');
      this.client.close();
    });

    return jsonMaster;
  }

  public async buscaProcesso(body: any): Promise<any> {
    let jsonMaster = {};
    const arpenp = new ArpenpProvider(body);
    const arpenpDados = await arpenp
      .arpenpPage()
      .then((jsonReturned) => jsonReturned)
      .finally(() => {
        arpenp.browser.close();
      });

    jsonMaster = {
      arpenp: arpenpDados,
      tipoConsulta: 'Processo',
      dataConsulta: await this.getDatetime()
    };

    await this.client.connect((err: any) => {
      const collection = this.client.db('mpsp').collection('consultas');
      collection.insertOne(jsonMaster);
      console.log('Consulta salva na collection');
      this.client.close();
    });

    return jsonMaster;
  }

  public async buscaCriminal(): Promise<any> {
    let jsonMaster = {};
    const infocrim = new InfocrimProvider();
    const infocrimDados = await infocrim
      .infocrimPage()
      .then((jsonReturned) => jsonReturned)
      .finally(() => {
        infocrim.browser.close();
      });

    jsonMaster = {
      infocrim: infocrimDados,
      tipoConsulta: 'Criminal',
      dataConsulta: await this.getDatetime()
    };

    await this.client.connect((err: any) => {
      const collection = this.client.db('mpsp').collection('consultas');
      collection.insertOne(jsonMaster);
      console.log('Consulta salva na collection');
      this.client.close();
    });

    return jsonMaster;
  }

  private async getDatetime() {
    const currentdate = new Date();
    return '' +
      currentdate.getDate() +
      '/' +
      (currentdate.getMonth() + 1) +
      '/' +
      currentdate.getFullYear() +
      ' ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds();
  }
}
