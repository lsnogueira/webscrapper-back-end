import express = require('express');
import puppeteer = require('puppeteer');

const MongoClient = require('mongodb').MongoClient;
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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/relatorio', async function (req, res) {
    

    var uri = "mongodb+srv://usuariompsp:usuariompsp@cluster0-limay.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect((err:any) => {
        console.log(err)
        const collection = client.db("mpsp").collection("consultas");
        // perform actions on the collection object
        collection.find({},  {projection:{
            "_id": 1,
        "tipoConsulta": 1}}).toArray(function(err:any, result:any){
            res.send(result);
        })
        console.log("Consultei")
        client.close();
        

        
      });
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