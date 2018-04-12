
const compare = () => {
    
    let ObjConvenios = jQuery.parseJSON(localStorage.resultCompare);
    console.log(ObjConvenios);
    
    ObjConvenios.forEach(element => {
      let fecha = element.Suscripción;
      let fechames = fecha.slice(0, 10);
    let template = `<div class="col-6 col-lg-3 box"><div class="card bg-light mb-3" >
      <div class="card-header">${element.Empresa}</div>   
    <div class="card-body">
      <h5 class="card-title">${element.Industria}</h5>
      <p class="card-text">${fechames}</p>
    </div>
  </div>
  </div>`

    $('#compare-box').append(template);
  });
};
  compare();
