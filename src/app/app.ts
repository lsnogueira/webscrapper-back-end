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

app.get('/relatorios', async (req, res) => {
  const uri =
    'mongodb+srv://usuariompsp:usuariompsp@cluster0-limay.mongodb.net/test?retryWrites=true&w=majority';
  const client = new mongo.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.connect((err: any) => {
    console.log(err);
    const collection = client.db('mpsp').collection('consultas');

    const pageOptions = {
      page: req.query.page || 0,
      limit: req.query.limit || 100
    };

    collection
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .toArray((err, doc) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.status(200).json(doc);
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
    .then(jsonMasterReturned => {
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
  buscador.buscaJuridica(req.body).then(jsonMasterReturned => {
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
  buscador.buscaProcesso(req.body).then(jsonMasterReturned => {
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
  buscador.buscaCriminal().then(jsonMasterReturned => {
    pdfMaker
      .construirPdfCriminal(jsonMasterReturned, documento)
      .then(() => {
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

async function carregaMongoDb(req: any, res: any, next: any) {
  const uri =
    'mongodb+srv://usuariompsp:usuariompsp@cluster0-limay.mongodb.net/test?retryWrites=true&w=majority';

  const client = new mongo.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await client.connect((err: any) => {
    console.log(err);

    const collection = client.db('mpsp').collection('consultas');

    const idObjeto = new mongo.ObjectID(req.params.id);

    collection
      .findOne({ _id: idObjeto })
      .then((docs: any) => {
        req.dataProcessed = docs;

        next();
      })
      .finally(() => {
        client.close();
      });
  });
}

async function geraPdf(req: any, res: any) {
  // Prepare the context

  const context = req.dataProcessed;

  console.log('Contexto', context);

  const pdfMaker = new PdfMaker();

  const PDFDocument = require('pdfkit');

  const documento = new PDFDocument();

  let out = fs.createWriteStream('src/app/output/pdfs/output.pdf');

  documento.pipe(out);

  await pdfMaker.construirPdf(context, documento).then(() => {
    out.on('finish', function() {
      res.download('src/app/output/pdfs/output.pdf');
    });
  });
}

app.get('/relatorio/:id', carregaMongoDb, geraPdf);

app.get('/relatorio', async function (req, res) {
   

  var uri = "mongodb+srv://usuariompsp:usuariompsp@cluster0-limay.mongodb.net/test?retryWrites=true&w=majority";
  const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect((err:any) => {
      console.log(err)
      const collection = client.db("mpsp").collection("consultas");
      // perform actions on the collection object
      collection.find({},  {projection:{
          "_id": 1,
      "dataConsulta": 1,
      "tipoConsulta": 1}}).toArray(function(err:any, result:any){
          res.send(result);
      })
      console.log("Consultei")
      client.close();

})
})

app.listen(3000, '0.0.0.0',function () {

  console.log('Example app listening on port 3000!');

});
