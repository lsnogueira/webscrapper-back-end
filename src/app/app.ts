import express = require('express');
import puppeteer = require('puppeteer');
import {PdfMaker} from './pdfMaker';
import * as fs from 'fs';
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

import {Main} from './main'


const app: express.Application = express();

app.get('/pdf', function (req, res) {
    var json = {
        "censec": {
            "partes": [
            {
                "nome": " EDUARDO LATI",
                "documento": " 14629967877",
                "qualidade": " OUTORGADO"
            },
            {
                "nome": " JOAO FLAVIO CURY FILHO",
                "documento": " 13552005803",
                "qualidade": " INTERVENIENTE"
            },
            {
                "nome": " MAURO VERGUEIRO",
                "documento": " 12837531898",
                "qualidade": " INTERVENIENTE"
            },
            {
                "nome": " ACME CO LTDA",
                "documento": " 19811999000105",
                "qualidade": " OUTORGANTE"
            }
            ],
            "dadosCartorio": [
            {
                "contato": " Recepção",
                "telefone": " (11) 3058-5100",
                "ramal": " ",
                "status": " Ativo",
                "tipo": " Fixo"
            },
            {
                "contato": " Cartório",
                "telefone": " (11) 30581018_",
                "ramal": " ",
                "status": " Ativo",
                "tipo": " Fixo"
            }
            ]
        }
        
        ,
        "siel": {
            "nome": "KLAUDIO TAFFAREL",
            "titulo": "123452300116",
            "data_nasc": "21/06/1989",
            "zona": "249",
            "endereco": "RUA LINS VASCONCELOS,121 AP 114 - SANTANA",
            "municipio": "SÃO PAULO",
            "uf": "SP",
            "data_domicilio": "14/12/2007",
            "nome_pai": "ROBERTO CAMARA",
            "nome_mae": "ANA LAURA TAFFAREL",
            "naturalidade": "SÃO PAULO, SP",
            "cod_validacao": "7431f2f05f7d3871e199515b14c8e833"
        },
        "sivec": {
            "nome": "JOAO CARLOS DE ANDRADE",
            "sexo": "Masculino",
            "data_nascimento": "",
            "rg": "",
            "n_controle vec": "",
            "tipo_rg": "R.G. COM OUTRAS QUALIFICACOES",
            "data_emissao rg": "27/05/1947",
            "alcunha": "JOAO BOTA",
            "estado_civil": "CASADO",
            "naturalidade": "CRISTAIS PAULISTA -SP",
            "naturalizado(s_n)": "NÃO",
            "posto_identificacao": "I.I.R.G.D.(CASPER LIBERO",
            "grau_instrucao": "PRIMEIRO CICLO",
            "formula_fundamental": "E4343/I2222",
            "nome_pai": "BERNARDINO CARDOSO DE ALMEIDA , BERNARDINO CARDOSO DE ANDRADE",
            "cor_olhos": "AZUIS",
            "nome_mae": "AMELIA DONARD DE JESUS , AMELIA DONALHA , AMELIA DONALIA DE JESUS , AMELIA DONADELI DE JESUS , AMELIA DORNALIA DE JESUS",
            "cabelo": "CAST.CLAROS",
            "cor_pele": "BRANCA",
            "profissao": "MOTORISTA",
            "residencial": "R ANTONIO CANDIDO MELO , 40 - FRANCA -SP",
            "trabalho": "FRANCA -SP"
        },
        "tipoConsulta": "Civil"
        }

    var pdfMaker = new PdfMaker()
    const PDFDocument = require('pdfkit');
    const documento = new PDFDocument;
    documento.pipe(res)
  pdfMaker.construirPdfCivil(json, documento).then(() => {
    documento.end()
  }, (error)=>{console.log(error)})  
});

app.get('/civil',  function (req, res) {
    /*Arisp -PDF
    
    , censec, siel, sivec */
    const buscador = new Main();
    var pdfMaker = new PdfMaker()
    const PDFDocument = require('pdfkit');
    const documento = new PDFDocument;
    let out = fs.createWriteStream('src/app/output/pdfs/output.pdf')
    documento.pipe(out)
    buscador.buscaCivil().then((jsonMasterReturned) => {
        pdfMaker.construirPdfCivil(jsonMasterReturned,documento).then(() => {
            out.on('finish', function(){
                res.download('src/app/output/pdfs/output.pdf')
            })
        })
    })        
});

app.get('/juridica', function (req, res) {
    /*Arisp - PDF
    
    , cadesp,caged,censec e jucesp */
    const buscador = new Main();
    var pdfMaker = new PdfMaker()
    const PDFDocument = require('pdfkit');
    const documento = new PDFDocument;
    let out = fs.createWriteStream('src/app/output/pdfs/output.pdf')
    documento.pipe(out)
    buscador.buscaJuridica().then((jsonMasterReturned) => {
        pdfMaker.construirPdfJuridica(jsonMasterReturned,documento).then(() => {
            out.on('finish', function(){
                res.download('src/app/output/pdfs/output.pdf')
            })
        })
    })              

  });

app.get('/processo', function (req, res) {
    /* Arpenp */
    const buscador = new Main();
    var pdfMaker = new PdfMaker()
    const PDFDocument = require('pdfkit');
    const documento = new PDFDocument;
    let out = fs.createWriteStream('src/app/output/pdfs/output.pdf')
    documento.pipe(out)
    buscador.buscaProcesso().then((jsonMasterReturned) => {
        pdfMaker.construirPdfProcesso(jsonMasterReturned,documento).then(() => {
            out.on('finish', function(){
                res.download('src/app/output/pdfs/output.pdf')
            })
        })
    }) 
});

app.get('/automotiva', function (req, res) {
    /* Detran - PDF
    
    */
    res.send('Hello World!');
});

app.get('/criminal', function (req, res) {
    /* Infocrim */
    const buscador = new Main();
    var pdfMaker = new PdfMaker()
    const PDFDocument = require('pdfkit');
    const documento = new PDFDocument;
    let out = fs.createWriteStream('src/app/output/pdfs/output.pdf')
    documento.pipe(out)
    buscador.buscaCriminal().then((jsonMasterReturned) => {
        pdfMaker.construirPdfCriminal(jsonMasterReturned,documento).then(() => {
            out.on('finish', function(){
                res.download('src/app/output/pdfs/output.pdf')
            })
        })
    })  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});