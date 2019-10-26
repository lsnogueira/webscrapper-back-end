import e = require("express");

const PDFDocument = require('pdfkit');
const fs = require('fs');



export class PdfMaker {
  
  constructor(){ }

  public pdfCensec(jsonCensec: any, docAux: any){
    docAux.addPage(
        docAux.image('src/app/img/CENSEC.jpg', 0, 0, {width: 612})
      );
    
    //Consultando partes
    docAux.image('src/app/img/background2.jpg', 0, 0, {width: 612})
    var x = 120
    var y = 180
    docAux.fontSize(20)
    docAux.font('Courier-Bold')
    docAux.text("Censec", 240, 110)
    docAux.text("Partes:", 120, 150)
    docAux.fontSize(14)
    jsonCensec["partes"].forEach((item:any) => {
        Object.keys(item).forEach((chave)=>{
            docAux.font('Courier-Bold')
            docAux.fillColor('#1f2837')        
            docAux.text(chave + ":", x, y)
            docAux.font('Courier')
            docAux.text(item[chave], x + 120,y)
            y += 30
        })
    })

    let yComecoAux = 105+70
    let xComecoAux = 90
    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+20)  //indo pra baixo                   
    .lineTo(x + 400, y+20)  //indo pra baixo direita          
    .lineTo(x + 400, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();  
    
    //Consultando Dados Cartorios

    docAux.addPage()
    docAux.image('src/app/img/background2.jpg', 0, 0, {width: 612})
    
    x = 120
    y = 180
    docAux.fontSize(20)
    docAux.font('Courier-Bold')
    docAux.text("Censec", 240, 110)
    docAux.text("Dados cartório:", 120, 150)
    docAux.fontSize(14)
    jsonCensec["dadosCartorio"].forEach((item:any) => {
        Object.keys(item).forEach((chave)=>{
            docAux.font('Courier-Bold')
            docAux.fillColor('#1f2837')        
            docAux.text(chave + ":", x, y)
            docAux.font('Courier')
            docAux.text(item[chave], x + 120,y)
            y += 30
        })
    })

    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+20)  //indo pra baixo                   
    .lineTo(x + 400, y+20)  //indo pra baixo direita          
    .lineTo(x + 400, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();  
  }

  private pdfSiel(jsonSiel: any, docAux: any){
    docAux.addPage(
        docAux.image('src/app/img/SIEL.jpg', 0, 0, {width: 612})
      );
    docAux.image('src/app/img/background2.jpg', 0, 0, {width: 612})
    var x = 120
    var y = 180
    docAux.fontSize(20)
    docAux.font('Courier-Bold')
    docAux.text("Siel", 240, 110)
    docAux.text("Dados do eleitor:", 120, 150)
    docAux.fontSize(14)
    
    Object.keys(jsonSiel).forEach((chave)=>{
        docAux.font('Courier-Bold')
        docAux.fillColor('#1f2837')        
        docAux.text(chave + ":", x, y)
        docAux.font('Courier')
        docAux.text(jsonSiel[chave], x + 120,y)
        y += 30
    })
    

    let yComecoAux = 105+70
    let xComecoAux = 90
    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+20)  //indo pra baixo                   
    .lineTo(x + 400, y+20)  //indo pra baixo direita          
    .lineTo(x + 400, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();  
    
    
  }

  private pdfSivec(jsonSivec: any, docAux: any){ 
    docAux.addPage(
        docAux.image('src/app/img/SIVEC.jpg', 0, 0, {width: 612})
      );

    var jsonSivec1: any = {}
    var jsonSivec2: any = {}
    let contador = 0
    Object.keys(jsonSivec).forEach((chave) => {
        
        if(contador <= 11){
            jsonSivec1[chave] = jsonSivec[chave]
        }else {
            jsonSivec2[chave] = jsonSivec[chave]
        }
        contador += 1
    })

    /* Json Sivec 1*/
    docAux.image('src/app/img/background2.jpg', 0, 0, {width: 612})
    var x = 130
    var y = 180
    docAux.fontSize(20)
    docAux.font('Courier-Bold')
    docAux.text("Sivec", 240, 110)
    docAux.text("Detalhes do réu:", 120, 150)
    docAux.fontSize(14)
    Object.keys(jsonSivec1).forEach((chave)=>{
        docAux.font('Courier-Bold')
        docAux.fillColor('#1f2837')        
        docAux.text(chave + ":", x, y)
        docAux.font('Courier')
        docAux.text(jsonSivec[chave], x + 165,y)
        y += 30
    })
    

    let yComecoAux = 105+70
    let xComecoAux = 120
    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+20)  //indo pra baixo                   
    .lineTo(x + 430, y+20)  //indo pra baixo direita          
    .lineTo(x + 430, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();  

    
    /* Json Sivec 2*/
    docAux.addPage()

    docAux.image('src/app/img/background2.jpg', 0, 0, {width: 612})
    x = 130
    y = 180
    docAux.fontSize(20)
    docAux.font('Courier-Bold')
    docAux.text("Sivec", 240, 110)
    docAux.text("Detalhes do réu:", 120, 150)
    docAux.fontSize(14)
    Object.keys(jsonSivec2).forEach((chave)=>{
        docAux.font('Courier-Bold')
        docAux.fillColor('#1f2837')        
        
        docAux.text(chave + ":", x, y)
        docAux.font('Courier')
        if(chave == "nome_pai" || chave =="nome_mae"){
            let posicaoVirgula = jsonSivec[chave].indexOf(",")
            let valor = jsonSivec[chave].substring(0,posicaoVirgula)
            docAux.text(valor, x + 170,y)
        }
        else{
            docAux.text(jsonSivec[chave], x + 170,y)
        }
        y += 40
    })
    

    yComecoAux = 105+70
    xComecoAux = 120
    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+20)  //indo pra baixo                   
    .lineTo(x + 400, y+20)  //indo pra baixo direita          
    .lineTo(x + 400, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();  

    

    
    
    
  }
  
  public async construirPdfCivil(jsonCivil: any, doc: any) : Promise<void>{    

    //doc.image('./img/background2.jpg', 0, 0, {width: 612})
    await doc.addPage(
        doc.image('src/app/img/coverCivil.jpg', 0, 0, {width: 612})
      );
    
    /* Censec */
    await this.pdfCensec(jsonCivil["censec"], doc)
    /* Siel */
    await doc.addPage()
    await this.pdfSiel(jsonCivil["siel"], doc)
    /* Sivec */
    await doc.addPage()
    await this.pdfSivec(jsonCivil["sivec"], doc)

    
 
    
  }



}