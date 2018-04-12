
const compare = () => {

    let ObjConvenios = jQuery.parseJSON(localStorage.resultCompare);
    console.log(ObjConvenios);

    ObjConvenios.forEach(element => {
        let fecha = element.Suscripción;
        let fechames = fecha.slice(0, 10);
        let template = `
    <div class="col-md-3 col-lg-3 box">
      <div class="card-header">${element.Empresa}
      </div>   
  </div>
`

        $('#compare-box').append(template);
        $('.Industria').append(`  
        <div class="col-3 text-center">${element.Industria}</div> 
    <br>
    `);
        $('.compare').append(`  
        <div class="col-3 text-center">${fechames}</div> 
    <br>
    `);
        $('.Bonificación').append(`  
    <div class="col-3 text-center">${element.Bonificación}</div> 
<br>
`);
        $('.Incremento').append(`  
<div class="col-3 text-center">${element.Incremento}</div> 
<br>
`);

        $('.Sindicato').append(`  
<div class="col-3 text-center">${element.Sindicato}</div> 
<br>
`);
        $('.Vigencia').append(`  
<div class="col-3 text-center">${element.Vigencia}</div> 
<br>
`);

    });
};
compare();


$('#ViewReport').click(function () {
    pdfCompare();
  });