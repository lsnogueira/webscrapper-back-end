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





// (async () => {
//     var pdfMaker = new PdfMaker()
//     var json = {
//       "censec": {
//         "partes": [
//           {
//             "nome": " EDUARDO LATI",
//             "documento": " 14629967877",
//             "qualidade": " OUTORGADO"
//           },
//           {
//             "nome": " JOAO FLAVIO CURY FILHO",
//             "documento": " 13552005803",
//             "qualidade": " INTERVENIENTE"
//           },
//           {
//             "nome": " MAURO VERGUEIRO",
//             "documento": " 12837531898",
//             "qualidade": " INTERVENIENTE"
//           },
//           {
//             "nome": " ACME CO LTDA",
//             "documento": " 19811999000105",
//             "qualidade": " OUTORGANTE"
//           }
//         ],
//         "dadosCartorio": [
//           {
//             "contato": " Recepção",
//             "telefone": " (11) 3058-5100",
//             "ramal": " ",
//             "status": " Ativo",
//             "tipo": " Fixo"
//           },
//           {
//             "contato": " Cartório",
//             "telefone": " (11) 30581018_",
//             "ramal": " ",
//             "status": " Ativo",
//             "tipo": " Fixo"
//           }
//         ]
//       }
      
//       ,
//       "siel": {
//         "nome": "KLAUDIO TAFFAREL",
//         "titulo": "123452300116",
//         "data_nasc": "21/06/1989",
//         "zona": "249",
//         "endereco": "RUA LINS VASCONCELOS,121 AP 114 - SANTANA",
//         "municipio": "SÃO PAULO",
//         "uf": "SP",
//         "data_domicilio": "14/12/2007",
//         "nome_pai": "ROBERTO CAMARA",
//         "nome_mae": "ANA LAURA TAFFAREL",
//         "naturalidade": "SÃO PAULO, SP",
//         "cod_validacao": "7431f2f05f7d3871e199515b14c8e833"
//       },
//       "sivec": {
//         "nome": "JOAO CARLOS DE ANDRADE",
//         "sexo": "Masculino",
//         "data_nascimento": "",
//         "rg": "",
//         "n_controle vec": "",
//         "tipo_rg": "R.G. COM OUTRAS QUALIFICACOES",
//         "data_emissao rg": "27/05/1947",
//         "alcunha": "JOAO BOTA",
//         "estado_civil": "CASADO",
//         "naturalidade": "CRISTAIS PAULISTA -SP",
//         "naturalizado(s_n)": "NÃO",
//         "posto_identificacao": "I.I.R.G.D.(CASPER LIBERO",
//         "grau_instrucao": "PRIMEIRO CICLO",
//         "formula_fundamental": "E4343/I2222",
//         "nome_pai": "BERNARDINO CARDOSO DE ALMEIDA , BERNARDINO CARDOSO DE ANDRADE",
//         "cor_olhos": "AZUIS",
//         "nome_mae": "AMELIA DONARD DE JESUS , AMELIA DONALHA , AMELIA DONALIA DE JESUS , AMELIA DONADELI DE JESUS , AMELIA DORNALIA DE JESUS",
//         "cabelo": "CAST.CLAROS",
//         "cor_pele": "BRANCA",
//         "profissao": "MOTORISTA",
//         "residencial": "R ANTONIO CANDIDO MELO , 40 - FRANCA -SP",
//         "trabalho": "FRANCA -SP"
//       },
//       "tipoConsulta": "Civil"
//     }
//     var documento = new PDFDocument
//     documento.pipe(fs.createWriteStream("output.pdf"))
//     pdfMaker.construirPdfCivil(json, documento)
//     documento.end()
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