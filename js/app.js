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
        $('#container-box').append(`
        
        <div class="col-6 col-lg-3 box"><div class="card bg-light mb-3  " >
        <div class="card-header">${element.Empresa}</div>
        <div class="card-body">
          <h5 class="card-title">${element.Industria}</h5>
          <p class="card-text">${fechames}</p>
        </div>
      </div>
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
      $('#container-box').empty();
      filterCompany(company);

    }
  });

});


function filterSuscription() {
  let result = [];
  info.on('value', function (datos) {
    data = datos.val();

    data.forEach(function (element) {
      if ((element.Suscripción).split) {
        console.log((element.Suscripción).substr(0, 4))
      }
      // result.push(element);
    });
  });
  return (result)
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
      if ((element.Vigencia).toString().substr(-4) === date) {
        resultDateVig.push(element);
      }

    });

    localStorage.setItem('resultDateVig', JSON.stringify(resultDateVig))
  });

}

let syndicate = document.getElementById('checkbox1');
let industry = document.getElementById('checkbox2');
let selectSyndicatesContainer = $('#select-syndicates');
let selectIndustriesContainer = $('#select-industries');
let selectSyndicates = $('#select-2');
let selectIndustries = $('#select-3');
info.on('value', function (datos) {
  data = datos.val();
  // Mostrar los filtros escogidos en el modal
  syndicate.addEventListener('change', function() {

  // Mostrar los 20 primeros
  let news = data.slice(0, 19);
  news.forEach(element => {
    let fecha = element.Suscripción;
    let fechames = fecha.slice(0, 10);
    let template = `<div class="col-6 col-lg-3 box"><div class="card bg-light mb-3  " >
    <div class="card-header">${element.Empresa}</div>
    <div class="card-body">
      <h5 class="card-title">${element.Industria}</h5>
      <p class="card-text">${fechames}</p>
    </div>
  </div>
  </div>`
    $('#container-box').append(template);
    $('.box').click(function () {
      window.open(`${element.URL}`, '_blank');
    });
  });

 // Mostrar resultados de búsqueda según la opción escogida

  let syndicateSelected = '';
  selectIndustries.change(function () {
  optionSelected = $('select[id=select-3]').val();
  syndicateSelected = optionSelected;
  console.log(syndicateSelected);
  });

  let industrySelected = '';
  selectSyndicates.change(function () {
  optionSelected2 = $('select[id=select-2]').val();
  industrySelected = optionSelected2;
  console.log(industrySelected);
  });
  
 let buttonFilter = $('#filter-type');
  // Filtrando los convenios
  buttonFilter.on('click', function() {
    localStorage.syndicate = $('select[id=select-2]').val();
    localStorage.industry = $('select[id=select-3]').val();
    var cards = $('.card-title');
    console.log(cards);
    // for(var i = 0; i < cards ; i++) {
    //   console.log(cards[i]);
    //   if (industrySelected === cards[i].innerHTML) {
    //     debugger;
    //     console.log(cards[i].innerHTML);
    //   }
    // };
  });

});

// Seleccionar tipo de filtro solo Empresa
let nameSelectCompany = false;
const checkCompany = $('#company-check');

checkCompany.on('change', function () {

  if (checkCompany[0].checked === true) {
    nameSelectCompany = true;
    $('#company').addClass("show");
    $('#company').removeClass("hide");
  } else {
    nameSelectCompany = false;
    $('#company').removeClass("show");
    $('#company').addClass("hide");
  }

});

// // Selección de Empresa
const selectCompany = $('#select-company');
//  selectCompany.on('change', function(event) {
//  console.log('asaasasa');



//  });

let nameCompany = '';

selectCompany.change(function () {
  let selectName = $('select[id=select-company]').val();
  nameCompany = selectName;

});
// Seleccionar tipo de filtro solo por año de suscripcion

const checkSuscripcion = $('#suscription-check');

checkSuscripcion.on('change', function() {
  
  if(checkSuscripcion[0].checked === true ){
  
    $('#suscripcion').addClass( "show" );
    $('#suscripcion').removeClass( "hide" );
  }
  else{
    $('#suscripcion').removeClass( "show" );
    $('#suscripcion').addClass( "hide" );
  }
  
});




$('#filter-type').on('click', function () {
  
   $('#container-box').empty();
  if (nameSelectCompany === true) {
    filterCompany(nameCompany);
    let dataResult = localStorage.result;
    let array = JSON.parse(dataResult);
    array.forEach(element => {
      let fecha = element.Suscripción;
      let fechames = fecha.slice(0, 10);
      let template = `<div class="col-6 col-lg-3 box"><div class="card bg-light mb-3  " >
   <div class="card-header">${element.Empresa}</div>
   <div class="card-body">
     <h5 class="card-title">${element.Industria}</h5>
     <p class="card-text">${fechames}</p>
   </div>
 </div>
 </div>`
      $('#container-box').append(template);
      $('.box').click(function () {
        window.open(`${element.URL}`, '_blank');
      });
    });
  }
})