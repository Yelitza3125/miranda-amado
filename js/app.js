// Initialize Firebase
let config = {
  apiKey: "AIzaSyAsb9kQKq_1uiBKsChewFZp3ELY_MG4wxc",
  authDomain: "miranda-y-amado.firebaseapp.com",
  databaseURL: "https://miranda-y-amado.firebaseio.com",
  projectId: "miranda-y-amado",
  storageBucket: "miranda-y-amado.appspot.com",
  messagingSenderId: "158203245206"
};
firebase.initializeApp(config);

let database = firebase.database();
let info = database.ref('convenios');
/*Función para obtener los datos*/
info.on('value', function (datos) {
  data = datos.val();
  function listEmpresas() {
    let Type = '';
    let ObjectTypes = [];
    for (i = 0; i < Object.keys(data).length; i++) {
      Type = data[i]['Empresa'];
      Type = data[i]['Empresa'];
      id = data[i]['N°'] - 1,
        ObjectTypes.push({
          id: id,
          name: Type
        });
    }
    console.log(ObjectTypes);
    return ObjectTypes;
  }

  $('.token-input').tokenInput(
    listEmpresas(), {
      theme: 'bootstrap',
      preventDuplicates: true,
      hintText: 'Escribe un termino de busqueda',
      noResultsText: 'No se encntraron Resultados',
      searchingText: 'Buscando...',
      tokenLimit: 1
    });
  function filterCompany(company) {
    let resultCompany = [];
    info.on('value', function (datos) {
      data = datos.val();
      data.forEach(element => {
        if (element.Empresa == company)
          resultCompany.push(element);
      });
      localStorage.setItem('result', JSON.stringify(resultCompany))
      console.log(resultCompany);

      resultCompany.forEach(element => {
        let fecha = element.Suscripción;
        let fechames = fecha.slice(0, 10);
        $('#convenio').append(`
        
          <div class="card-body">
          <h5 class="card-title">${element.Empresa} </h5>
          <p class="card-text"> ${fechames} </p>
        </div>
        `);


        $('.card-body').click(function () {
          window.open(`${element.URL}`, '_blank');
        });
      })
    });

  }
  $('#buscar').click(function () {
    let company = $('.token-input').tokenInput('get')[0]['name'];
    let inputvalue = $('.token-input').tokenInput('get');
    if (inputvalue.length === 0) {
      alert('ingrese un valor');
    } else {
      $('#convenio').empty();
      filterCompany(company);

    }
  });

});
  

function filterSuscription(){
  let result=[];
  info.on('value', function(datos) {
    data = datos.val();
    console.log(data);
    data.forEach(function(element){
      if((element.Suscripción).split){
      console.log((element.Suscripción).substr(0,4))
      }
      // result.push(element);
    });
  });
  return(result)
}
filterSuscription()


// Filtro por Empresa
function filterCompany(company) {
  let resultCompany = [];
  info.on('value', function (datos) {
    data = datos.val();
    data.forEach(element => {
      if (element.Empresa == company)
        resultCompany.push(element);

    });
    localStorage.setItem('result', JSON.stringify(resultCompany))
  });

}

function filterVigence(date) {
  let resultDateVig = [];
  
    info.on('value', function (datos) {
      data = datos.val();
      data.forEach(element => {
        if((element.Vigencia).toString().substr(-4)=== date) {
          resultDateVig.push(element);
        }
        
      });
  
      localStorage.setItem('resultDateVig', JSON.stringify(resultDateVig))
    });
  
}

