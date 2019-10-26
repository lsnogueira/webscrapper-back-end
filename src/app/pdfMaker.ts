import e = require("express");

const PDFDocument = require('pdfkit');
const fs = require('fs');



export class PdfMaker {
  
  constructor(){ }

  /* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          Arpenp
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  */

 public pdfArpenp(jsonArpenp: any, docAux: any, background: string){
  var jsonArpenp1: any = {}
  var jsonArpenp2: any = {}
  let contador = 0


  Object.keys(jsonArpenp).forEach((chave) => {
      
      if(contador < 7){
        jsonArpenp1[chave] = jsonArpenp[chave]
      }else {
        jsonArpenp2[chave] = jsonArpenp[chave]
      }
      contador += 1
  })

  let strBackground = 'src/app/img/' + background+'.jpg'
  docAux.addPage(
      docAux.image('src/app/img/ARPENP.jpg', 0, 0, {width: 612})
    );
  
  //Consultando partes
  
  docAux.image(strBackground, 0, 0, {width: 612})
  var x = 120
  var y = 180
  docAux.fontSize(20)
  docAux.font('Courier-Bold')
  docAux.text("Arpenp", 240, 110)
  docAux.fontSize(14)
  docAux.text("Informações: ", 120, 150)
  docAux.fontSize(14)
  
  
  Object.keys(jsonArpenp1).forEach((chave: any) => {

    
    docAux.font('Courier-Bold')
    docAux.fillColor('#1f2837')        
    docAux.text(chave + ":", x, y)
    docAux.font('Courier')
    docAux.text(jsonArpenp[chave], x + 200,y)
    y += 60     
  
  })
    let yComecoAux = 105+70
    let xComecoAux = 90
    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+15)  //indo pra baixo                   
    .lineTo(x + 430, y+15)  //indo pra baixo direita          
    .lineTo(x + 430, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();   

    //parte2
  docAux.addPage()
  x = 120
  y = 180
  docAux.image(strBackground, 0, 0, {width: 612})
  docAux.fontSize(20)
  docAux.font('Courier-Bold')
  docAux.text("Arpenp", 240, 110)
  docAux.fontSize(14)
  docAux.text("Informações: ", 120, 150)
  docAux.fontSize(14)
  
  
  Object.keys(jsonArpenp2).forEach((chave: any) => {

    
    docAux.font('Courier-Bold')
    docAux.fillColor('#1f2837')        
    docAux.text(chave + ":", x, y)
    docAux.font('Courier')
    docAux.text(jsonArpenp[chave], x + 200,y)
    y += 45     
  
  })
    yComecoAux = 105+70
    xComecoAux = 90
    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+15)  //indo pra baixo                   
    .lineTo(x + 430, y+15)  //indo pra baixo direita          
    .lineTo(x + 430, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();   


}

/* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          Infocrim
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  */

 public pdfInfocrom(jsonInfocrim: any, docAux: any, background: string){
  var jsonInfocrim1: any = {}
  var jsonInfocrim2: any = {}
  let contador = 0
  let titulo = jsonInfocrim["tituloRelatorio"]
  delete jsonInfocrim["tituloRelatorio"]

  Object.keys(jsonInfocrim).forEach((chave) => {
      
      if(contador < 7){
        jsonInfocrim1[chave] = jsonInfocrim[chave]
      }else {
        jsonInfocrim2[chave] = jsonInfocrim[chave]
      }
      contador += 1
  })

  let strBackground = 'src/app/img/' + background+'.jpg'
  docAux.addPage(
      docAux.image('src/app/img/INFOCRIM.jpg', 0, 0, {width: 612})
    );
  
  //Consultando partes
  
  docAux.image(strBackground, 0, 0, {width: 612})
  var x = 120
  var y = 180
  docAux.fontSize(20)
  docAux.font('Courier-Bold')
  docAux.text("Infocrim", 240, 110)
  docAux.fontSize(14)
  docAux.text(titulo, 120, 150)
  docAux.fontSize(14)
  
  
  Object.keys(jsonInfocrim1).forEach((chave: any) => {

    
    docAux.font('Courier-Bold')
    docAux.fillColor('#1f2837')        
    docAux.text(chave + ":", x, y)
    docAux.font('Courier')
    docAux.text(jsonInfocrim[chave], x + 200,y)
    y += 60     
  
  })
    let yComecoAux = 105+70
    let xComecoAux = 90
    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+15)  //indo pra baixo                   
    .lineTo(x + 430, y+15)  //indo pra baixo direita          
    .lineTo(x + 430, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();   

    //parte2
  docAux.addPage()
  x = 120
  y = 180
  docAux.image(strBackground, 0, 0, {width: 612})
  docAux.fontSize(20)
  docAux.font('Courier-Bold')
  docAux.text("Infocrim", 240, 110)
  docAux.fontSize(14)
  docAux.text(titulo, 120, 150)
  docAux.fontSize(14)
  
  
  Object.keys(jsonInfocrim2).forEach((chave: any) => {

    
    docAux.font('Courier-Bold')
    docAux.fillColor('#1f2837')        
    docAux.text(chave + ":", x, y)
    docAux.font('Courier')
    docAux.text(jsonInfocrim[chave], x + 200,y)
    y += 45     
  
  })
    yComecoAux = 105+70
    xComecoAux = 90
    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+15)  //indo pra baixo                   
    .lineTo(x + 430, y+15)  //indo pra baixo direita          
    .lineTo(x + 430, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();   


}
  /* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          Cadesp
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  */

 public pdfCadesp(jsonCadesp: any, docAux: any, background: string){
  let strBackground = 'src/app/img/' + background+'.jpg'
  docAux.addPage(
      docAux.image('src/app/img/CADESP.jpg', 0, 0, {width: 612})
    );
  
  //Consultando partes
  
  docAux.image(strBackground, 0, 0, {width: 612})
  var x = 120
  var y = 180
  docAux.fontSize(20)
  docAux.font('Courier-Bold')
  docAux.text("Cadesp", 240, 110)
  docAux.text("Informações:", 120, 150)
  docAux.fontSize(14)
  
  Object.keys(jsonCadesp).forEach((chave: any) => {

    
    docAux.font('Courier-Bold')
    docAux.fillColor('#1f2837')        
    docAux.text(chave + ":", x, y)
    docAux.font('Courier')
    docAux.text(jsonCadesp[chave], x + 200,y)
    y += 30     
  
  })
    let yComecoAux = 105+70
    let xComecoAux = 90
    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+30)  //indo pra baixo                   
    .lineTo(x + 430, y+30)  //indo pra baixo direita          
    .lineTo(x + 430, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();   


}

  /* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          Caged
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  */

  public pdfCaged(jsonCaged: any, docAux: any, background: string){
    let strBackground = 'src/app/img/' + background+'.jpg'
    docAux.addPage(
        docAux.image('src/app/img/CAGED.jpg', 0, 0, {width: 612})
      );
    
    //Consultando partes
    let contador = 0;
    docAux.image(strBackground, 0, 0, {width: 612})
    var x = 120
    var y = 180
    docAux.fontSize(20)
    docAux.font('Courier-Bold')
    docAux.text("Caged", 240, 110)
    docAux.text("Informações:", 120, 150)
    docAux.fontSize(14)
    
    jsonCaged.forEach((item: any) => {

      Object.keys(item).forEach((chave)=>{
          docAux.font('Courier-Bold')
          docAux.fillColor('#1f2837')        
          docAux.text(chave + ":", x, y)
          docAux.font('Courier')
          docAux.text(item[chave], x + 200,y)
          y += 30
      })

      let yComecoAux = 105+70
      let xComecoAux = 90
      docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
      .lineTo(xComecoAux, y+30)  //indo pra baixo                   
      .lineTo(x + 430, y+30)  //indo pra baixo direita          
      .lineTo(x + 430, yComecoAux)   //indo pra cima direita
      .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
      .stroke();    
    

      
      
      console.log(item, contador)
      if(contador != 2){
        x = 120
        y = 180
        docAux.fontSize(20)
        docAux.font('Courier-Bold')
        docAux.text("Caged", 240, 110)
        docAux.text("Informações:", 120, 150)
        docAux.fontSize(14)
        docAux.addPage()
        docAux.image(strBackground, 0, 0, {width: 612})
      }
      contador = contador + 1;
      

    })
 
  
  }

  /* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          CENSEC
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  */
  public pdfCensec(jsonCensec: any, docAux: any, background: string){
    let strBackground = 'src/app/img/' + background+'.jpg'
    docAux.addPage(
        docAux.image('src/app/img/CENSEC.jpg', 0, 0, {width: 612})
      );
    
    //Consultando partes
    docAux.image(strBackground, 0, 0, {width: 612})
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
    .lineTo(x + 430, y+20)  //indo pra baixo direita          
    .lineTo(x + 430, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();  
    
    //Consultando Dados Cartorios

    docAux.addPage()
    docAux.image(strBackground, 0, 0, {width: 612})
    
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
    .lineTo(x + 430, y+20)  //indo pra baixo direita          
    .lineTo(x + 430, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();  
  }

   /* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          Jucesp
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  */
  public pdfJucesp(jsonJucesp: any, docAux: any, background: string){
    
    var jsonJucesp1: any = {}
    var jsonJucesp2: any = {}
    let contador = 0
    Object.keys(jsonJucesp).forEach((chave) => {
        
        if(contador < 7){
          jsonJucesp1[chave] = jsonJucesp[chave]
        }else {
          jsonJucesp2[chave] = jsonJucesp[chave]
        }
        contador += 1
    })


    let strBackground = 'src/app/img/' + background+'.jpg'
    docAux.addPage(
        docAux.image('src/app/img/JUCESP.jpg', 0, 0, {width: 612})
      );
    
    //Consultando partes
    docAux.image(strBackground, 0, 0, {width: 612})
    var x = 120
    var y = 180
    docAux.fontSize(20)
    docAux.font('Courier-Bold')
    docAux.text("Jucesp", 240, 110)
    docAux.text("Informações:", 120, 150)
    docAux.fontSize(14)
    
    Object.keys(jsonJucesp1).forEach((chave)=>{
        docAux.font('Courier-Bold')
        docAux.fillColor('#1f2837')        
        docAux.text(chave + ":", x, y)
        docAux.font('Courier')
        docAux.text(jsonJucesp[chave], x + 150,y)
        y += 30
    })
    

    let yComecoAux = 105+70
    let xComecoAux = 90
    docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
    .lineTo(xComecoAux, y+130)  //indo pra baixo                   
    .lineTo(x + 430, y+130)  //indo pra baixo direita          
    .lineTo(x + 430, yComecoAux)   //indo pra cima direita
    .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
    .stroke();    
    
    docAux.addPage()


     //Jucesp2 partes
     docAux.image(strBackground, 0, 0, {width: 612})
     var x = 120
     var y = 180
     docAux.fontSize(20)
     docAux.font('Courier-Bold')
     docAux.text("Jucesp", 240, 110)
     docAux.text("Informações:", 120, 150)
     docAux.fontSize(14)
     
     Object.keys(jsonJucesp2).forEach((chave)=>{
         docAux.font('Courier-Bold')
         docAux.fillColor('#1f2837')        
         docAux.text(chave + ":", x, y)
         docAux.font('Courier')
         docAux.text(jsonJucesp[chave], x + 150,y)
         y += 55
     })
     
 
     yComecoAux = 105+70
     xComecoAux = 90
     docAux.moveTo(xComecoAux, yComecoAux)  //começo                                                 
     .lineTo(xComecoAux, y+20)  //indo pra baixo                   
     .lineTo(x + 430, y+20)  //indo pra baixo direita          
     .lineTo(x + 430, yComecoAux)   //indo pra cima direita
     .lineTo(xComecoAux,yComecoAux) //Voltando ao começo
     .stroke();    
     
  
  
  }

   /* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          Siel
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  */
  private pdfSiel(jsonSiel: any, docAux: any, background:string){
    let strBackground = 'src/app/img/' + background+'.jpg'
    docAux.addPage(
        docAux.image('src/app/img/SIEL.jpg', 0, 0, {width: 612})
      );
    docAux.image(strBackground, 0, 0, {width: 612})
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

   /* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          Sivec
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  */
  private pdfSivec(jsonSivec: any, docAux: any, background: string){ 
    let strBackground = 'src/app/img/' + background+'.jpg'
    
    docAux.addPage(
        docAux.image(strBackground, 0, 0, {width: 612})
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
    docAux.image(strBackground, 0, 0, {width: 612})
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

    docAux.image(strBackground, 0, 0, {width: 612})
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
    await this.pdfCensec(jsonCivil["censec"], doc, 'backgroundCivil')
    /* Siel */
    await doc.addPage()
    await this.pdfSiel(jsonCivil["siel"], doc, 'backgroundCivil')
    /* Sivec */
    await doc.addPage()
    await this.pdfSivec(jsonCivil["sivec"], doc, 'backgroundCivil')
    await doc.end()
    
  }


  public async construirPdfJuridica(jsonJuridica: any, doc: any) : Promise<void>{    
    /*cadesp,caged,censec e jucesp */

    //doc.image('./img/background2.jpg', 0, 0, {width: 612})
    await doc.addPage(
        doc.image('src/app/img/coverJuridica.jpg', 0, 0, {width: 612})
      );
    
    /* Jucesp */
    await this.pdfJucesp(jsonJuridica["jucesp"], doc, 'backgroundJuridica')
    /* Caged */
    await this.pdfCaged(jsonJuridica["caged"], doc, 'backgroundJuridica')
    /* Censec */
    await this.pdfCensec(jsonJuridica["censec"], doc, 'backgroundJuridica')
    /*Cadesp */
    await this.pdfCadesp(jsonJuridica["cadesp"], doc, 'backgroundJuridica')

    await doc.end()
   
  }

  public async construirPdfCriminal(jsonCriminal: any, doc: any) : Promise<void>{    
    /*cadesp,caged,censec e jucesp */

    //doc.image('./img/background2.jpg', 0, 0, {width: 612})
    await doc.addPage(
        doc.image('src/app/img/coverCriminal.jpg', 0, 0, {width: 612})
      );
    
    /* InfoCrim */
    await this.pdfInfocrom(jsonCriminal["infocrim"], doc, 'backgroundCriminal')
    await doc.end()
   
  }


  public async construirPdfProcesso(jsonProcesso: any, doc: any) : Promise<void>{    
    /*cadesp,caged,censec e jucesp */

    //doc.image('./img/background2.jpg', 0, 0, {width: 612})
    await doc.addPage(
        doc.image('src/app/img/coverProcessos.jpg', 0, 0, {width: 612})
      );
    
    /* InfoCrim */
    await this.pdfArpenp(jsonProcesso["arpenp"], doc, 'backgroundProcessos')
    await doc.end()
   
  }




}