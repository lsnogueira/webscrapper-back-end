import express = require('express');
import mongo = require('mongodb');
import fs = require('fs');
import bodyParser = require('body-parser');

import { Main } from './main';
import { PdfMaker } from './pdfMaker';

const app: express.Application = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/relatorio', async (req, res) => {
  const uri =
    'mongodb+srv://usuariompsp:usuariompsp@cluster0-limay.mongodb.net/test?retryWrites=true&w=majority';
  const client = new mongo.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.connect((err: any) => {
    console.log(err);
    const collection = client.db('mpsp').collection('consultas');
    collection
      .find(
        {},
        {
          projection: {
            _id: 1,
            tipoConsulta: 1
          }
        }
      )
      .toArray((err: any, result: any) => {
        res.send(result);
      });
    console.log('Consultei');
    client.close();
  });
});

app.post('/civil', (req, res) => {
  const buscador = new Main();
  const pdfMaker = new PdfMaker();
  const PDFDocument = require('pdfkit');
  const documento = new PDFDocument();
  const out = fs.createWriteStream('src/app/output/pdfs/civil.pdf');
  documento.pipe(out);
  buscador
    .buscaCivil(req.body)
    .then((jsonMasterReturned) => {
      pdfMaker.construirPdfCivil(jsonMasterReturned, documento).then(() => {
        out.on('finish', () => {
          res.download('src/app/output/pdfs/civil.pdf');
        });
      });
    })
    .catch(err => {
      console.log('erou aqui bicho', err);
      res.status(420).send({ message: 'scrapper brisou' });
    });
});

app.post('/juridica', (req, res) => {
  const buscador = new Main();
  const pdfMaker = new PdfMaker();
  const PDFDocument = require('pdfkit');
  const documento = new PDFDocument();
  const out = fs.createWriteStream('src/app/output/pdfs/juridico.pdf');
  documento.pipe(out);
  buscador.buscaJuridica(req.body).then((jsonMasterReturned) => {
    pdfMaker
      .construirPdfJuridica(jsonMasterReturned, documento)
      .then(() => {
        out.on('finish', () => {
          res.download('src/app/output/pdfs/juridico.pdf');
        });
      })
      .catch(err => {
        console.log('erou aqui bicho', err);
        res.status(420).send({ message: 'scrapper brisou' });
      });
  });
});

app.post('/processo', (req, res) => {
  const buscador = new Main();
  const pdfMaker = new PdfMaker();
  const PDFDocument = require('pdfkit');
  const documento = new PDFDocument();
  const out = fs.createWriteStream('src/app/output/pdfs/processo.pdf');
  documento.pipe(out);
  buscador.buscaProcesso(req.body).then((jsonMasterReturned) => {
    pdfMaker
      .construirPdfProcesso(jsonMasterReturned, documento)
      .then(() => {
        out.on('finish', () => {
          res.download('src/app/output/pdfs/processo.pdf');
        });
      })
      .catch(err => {
        console.log('erou aqui bicho', err);
        res.status(420).send({ message: 'scrapper brisou' });
      });
  });
});

app.get('/automotiva', (req, res) => {
  res.send('Hello World!');
});

app.get('/criminal', (req, res) => {
  const buscador = new Main();
  const pdfMaker = new PdfMaker();
  const PDFDocument = require('pdfkit');
  const documento = new PDFDocument();
  const out = fs.createWriteStream('src/app/output/pdfs/criminal.pdf');
  documento.pipe(out);
  buscador.buscaCriminal().then((jsonMasterReturned) => {
    pdfMaker.construirPdfCriminal(jsonMasterReturned, documento).then(() => {
      out.on('finish', () => {
        res.download('src/app/output/pdfs/criminal.pdf');
      });
    })
    .catch(err => {
      console.log('erou aqui bicho', err);
      res.status(420).send({ message: 'scrapper brisou' });
    });
  });
});

app.listen(3000, () => {
  console.log('Saí de casa comi pra caralho porra!! Ouve na 3000!');
});
