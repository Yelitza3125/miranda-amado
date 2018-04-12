
// Mostrar los 20 primeros
let DataDetail=JSON.parse(localStorage.data);
let news = DataDetail.slice(0, 19);
news.forEach(element => {
    if(element["N°"] === parseInt(localStorage.getItem("idButton"))) {
        
   
  let fecha = element.Suscripción;
  let fechames = fecha.slice(0, 10);
 
  let template = `<div class="col-12 col-lg-10 offset-1 box"><div class="card bg-light mb-3" >
       
    <div class="card-header">
    <div class="row">
       <div class="col-10 col-lg-10 offset-1">
       <span>SUSCRIPCIÓN: </span>
        <span class="detaill-campo">${fechames}</span><hr>
       </div>

       <div class="col-10 col-lg-10 offset-1">
       <span>VIGENCIA: </span>
       <span class="detaill-campo">${element.Vigencia}</span><hr>
      </div>

      <div class="col-10 col-lg-10 offset-1">
      <span>EMPRESA: </span>
      <span class="detaill-campo">${element.Empresa}</span><hr>
     </div>

     <div class="col-10 col-lg-10 offset-1">
     <span>SINDICATO: </span>
     <span class="detaill-campo">${element.Sindicato}</span><hr>
    </div>
    <div class="col-10 col-lg-10 offset-1">
     <span>INDUSTRIA: </span>
     <span class="detaill-campo">${element.Industria}</span><hr>
    </div>
    <div class="col-10 col-lg-10 offset-1">
     <span>INCREMENTO: </span>
     <span class="detaill-campo">${element.Incremento}</span><hr>
    </div>
    <div class="col-10 col-lg-10 offset-1">
     <span>BONIFICACIÓN: </span>
     <span class="detaill-campo">${element.Bonificación}</span><hr>
    </div>
    
    </div>
    </div>
    

</div>


</div>`
$('#container-detaill').append(template);
}

});