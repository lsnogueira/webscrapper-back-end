import express = require('express');
import puppeteer = require('puppeteer');
import {PdfMaker} from './pdfMaker';
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


// app.get('/', function (req, res) {
//   cadespPage().then((json) => {
//     console.log(json)

//     const PDFDocument = require('pdfkit');
//     const documento = new PDFDocument;

//     const fs = require('fs')
//     //documento.pipe(fs.createWriteStream("./output/pdfs/arquivo.pdf"))
//     documento.pipe(res)


    
    



//     // documento.text("Relatório MPSP", 65, 15);

    
    
    
//     documento.text("IE", 12, 50);
//     documento.text("143.289.040.112", 200, 50);

//     documento.text("SITUACAO", 12, 75);
//     documento.text("Ativo", 200, 75);

//     documento.text("CNPJ", 12, 100);
//     documento.text("19.811.201/0001-05", 200, 100);

//     documento.text("DATA_INSCRICAO_ESTADO", 12, 125);
//     documento.text("28/02/2014", 200, 125);

//     documento.text("NOME_EMPRESARIAL", 12, 150);
//     documento.text("LAMBDA CONSTRUTORA LTDA", 200, 150);

//     documento.text("REGIME_ESTADUAL", 12, 175);
//     documento.text("RPA", 200, 175);

//     documento.text("DRT", 12, 200);
//     documento.text("DRTC-III - SÃO PAULO", 200, 200);

//     documento.text("POSTO_FISCAL", 12, 225);
//     documento.text("PFC-10 - BUTANTÃ", 200, 225);

//     documento.text("NOME_FANTASIA", 12, 250);
//     documento.text("Nome Fantasia não informado", 200, 250);

//     documento.text("DATA_INICIO_IE", 12, 275);
//     documento.text("28/02/2014", 200, 275);

//     documento.text("NIRE", 12, 300);
//     documento.text("35.2.2819796-1", 200, 300);

//     documento.text("SITUACAO_CADASTRAL", 12, 325);
//     documento.text("Ativo", 200, 325);

//     documento.text("DATA_INICIO_SITUACAO", 12, 350);
//     documento.text("28/02/2014", 200, 350);

//     documento.text("OCORRENCIA_FISCAL", 12, 375);
//     documento.text("Ativa", 200, 375);

//     documento.text("TIPO_UNIDADE", 12, 400);
//     documento.text("Unidade produtiva", 200, 400);

//     documento.text("FORMAS_ATUACAO", 12, 425);
//     documento.text("Estabelecimento Fixo", 200, 425);

//     documento.end()
  
//   }, (error)=>{console.log(error)})  

  


// });


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
    documento.pipe(res)
    buscador.buscaCivil().then((jsonMasterReturned) => {
        pdfMaker.construirPdfCivil(jsonMasterReturned,documento).then(() => {
            documento.end()
        })
    })        
});

app.get('/juridica', function (req, res) {
    /*Arisp - PDF
    
    , cadesp,caged,censec e jucesp */
    const buscador = new Main();
    buscador.buscaJuridica().then((jsonMasterReturned) => {
        res.send(jsonMasterReturned)
    })      

  });

app.get('/processo', function (req, res) {
    /* Arpenp */
    const buscador = new Main();
    buscador.buscaProcesso().then((jsonMasterReturned) => {
        res.send(jsonMasterReturned)
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
    buscador.buscaCriminal().then((jsonMasterReturned) => {
        res.send(jsonMasterReturned)
    })      
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});