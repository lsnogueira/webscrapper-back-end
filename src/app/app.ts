import express = require('express');
import { cadespPage, arpenpPage, sielPage, sivecPage, cagedPage } from './providers/barrel';



const app: express.Application = express();


app.get('/', function (req, res) {
  cadespPage().then((json) => {
    console.log(json)

    const PDFDocument = require('pdfkit');
    const documento = new PDFDocument;

    const fs = require('fs')
    //documento.pipe(fs.createWriteStream("./output/pdfs/arquivo.pdf"))
    documento.pipe(res)


    
    



    // documento.text("Relatório MPSP", 65, 15);

    
    
    
    documento.text("IE", 12, 50);
    documento.text("143.289.040.112", 200, 50);

    documento.text("SITUACAO", 12, 75);
    documento.text("Ativo", 200, 75);

    documento.text("CNPJ", 12, 100);
    documento.text("19.811.201/0001-05", 200, 100);

    documento.text("DATA_INSCRICAO_ESTADO", 12, 125);
    documento.text("28/02/2014", 200, 125);

    documento.text("NOME_EMPRESARIAL", 12, 150);
    documento.text("LAMBDA CONSTRUTORA LTDA", 200, 150);

    documento.text("REGIME_ESTADUAL", 12, 175);
    documento.text("RPA", 200, 175);

    documento.text("DRT", 12, 200);
    documento.text("DRTC-III - SÃO PAULO", 200, 200);

    documento.text("POSTO_FISCAL", 12, 225);
    documento.text("PFC-10 - BUTANTÃ", 200, 225);

    documento.text("NOME_FANTASIA", 12, 250);
    documento.text("Nome Fantasia não informado", 200, 250);

    documento.text("DATA_INICIO_IE", 12, 275);
    documento.text("28/02/2014", 200, 275);

    documento.text("NIRE", 12, 300);
    documento.text("35.2.2819796-1", 200, 300);

    documento.text("SITUACAO_CADASTRAL", 12, 325);
    documento.text("Ativo", 200, 325);

    documento.text("DATA_INICIO_SITUACAO", 12, 350);
    documento.text("28/02/2014", 200, 350);

    documento.text("OCORRENCIA_FISCAL", 12, 375);
    documento.text("Ativa", 200, 375);

    documento.text("TIPO_UNIDADE", 12, 400);
    documento.text("Unidade produtiva", 200, 400);

    documento.text("FORMAS_ATUACAO", 12, 425);
    documento.text("Estabelecimento Fixo", 200, 425);

    documento.end()
  
  }, (error)=>{console.log(error)})  

  


});

app.get('/consulta', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});