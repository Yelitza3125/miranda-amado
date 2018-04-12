let position = 20;
const compare = () => {
    let pdf = '';
    pdf = new jsPDF();
    let ObjConvenios = jQuery.parseJSON(localStorage.resultCompare);
    console.log(ObjConvenios);

    ObjConvenios.forEach(element => {
        let fecha = element.Suscripción;
        let fechames = fecha.slice(0, 10);

        let template = `
    <div class="col-6  col-lg-3 box">
      <div class="card-header bold-none">${element.Empresa}
      </div>   
  </div>
`

        $('#compare-box').append(template);
        $('.Industria').append(`  
        <div class="col-5 col-lg-3 text-center">${element.Industria}</div> 
    <br>
    `);
        $('.compare').append(`  
        <div class="col-5  col-lg-3 text-center">${fechames}</div> 
    <br>
    `);
        $('.Bonificación').append(`  
    <div class="col-5  col-lg-3 text-center">${element.Bonificación}</div> 
<br>
`);
        $('.Incremento').append(`  
<div class="col-5  col-lg-3 text-center">${element.Incremento}</div> 
<br>
`);

        $('.Sindicato').append(`  
<div class="col-5  col-lg-3 text-center">${element.Sindicato}</div> 
<br>
`);
        $('.Vigencia').append(`  
<div class="col-5  col-lg-3 text-center">${element.Vigencia}</div> 
<br>
`);



        pdf.setFontSize(12);
        pdf.text(20, 10, `Reporte Comparativo`);
        pdf.text(20, `${position+5}`, `Empresa : ${element.Empresa}`);
        pdf.text(20, `${position+10}`, `Industria : ${element.Industria}`);
        pdf.text(20, `${position+15}`, `Sindicato : ${element.Sindicato}`);
        pdf.text(20, `${position+20}`, `Suscripción : ${fechames}`);
        pdf.text(20, `${position+25}`, `Vigencia : ${element.Vigencia}`);
        pdf.text(20, `${position+30}`, `Bonificación : ${element.Bonificación}`);
        pdf.text(20, `${position+35}`, `Incremento : ${element.Incremento}`);

        position = position + 45;
    });

    $('#ViewReport').click(function () {
        pdf.save('mipdf.pdf');
    });
};
compare();