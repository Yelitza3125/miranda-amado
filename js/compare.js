
const compare = () => {
    
    let ObjConvenios = jQuery.parseJSON(localStorage.resultCompare);
    console.log(ObjConvenios);
    console.log(Object.keys(ObjConvenios));

    ObjConvenios.forEach(element => {
      let fecha = element.Suscripción;
      let fechames = fecha.slice(0, 10);
    let template = `
    <div class="col-6 col-lg-3 box">
      <div class="card-header">${element.Empresa}
      </div>   
    <div class="card-body">
      <h5 class="card-title">${element.Industria}</h5>
      <p class="card-text">${fechames}</p>
    </div>
  </div>
`

    $('#compare-box').append(template);
    $('.compare').append(`  
        <div class="col-6 text-center">${fechames}</div> 
    <br>
    `);
    $('.Bonificación').append(`  
    <div class="col-6 text-center">${element.Bonificación}</div> 
<br>
`);
$('.Incremento').append(`  
<div class="col-6 text-center">${element.Incremento}</div> 
<br>
`);

$('.Sindicato').append(`  
<div class="col-6 text-center">${element.Sindicato}</div> 
<br>
`);
$('.Vigencia').append(`  
<div class="col-6 text-center">${element.Vigencia}</div> 
<br>
`);

  });
};
  compare();
