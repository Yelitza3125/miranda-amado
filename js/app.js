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
    console.log(data);
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

// Mostrar los 20 primeros

info.on('value', function (datos) {

  data = datos.val();
  let news = data.slice(0, 19);
  news.forEach(element => {
    let fecha = element.Suscripción;
    let fechames = fecha.slice(0, 10);
    let template = `<div class="col-6 col-lg-3 box"><div class="card bg-light mb-3" >
    <div class="row">
      <div class="col-lg-9">
      <div class="card-header">${element.Empresa}</div>
      </div>
      <div class="col-lg-3">
        <div class="form-check">
         <label class="form-check-label">
          <input type="checkbox" class="form-check-input nroconvenio" data-nro=${element["N°"]}>
        </label>
        </div>
      </div>
    </div>
   
    <div class="card-body">
      <h5 class="card-title">${element.Industria}</h5>
      <p class="card-text">${fechames}</p>
    </div>
  </div>
  </div>`

    $('#container-box').append(template);
    $('.card-body').click(function () {
      window.open(`${element.URL}`, '_blank');
    });

  });
  let resultCompare = [];




  $('.nroconvenio').click(function () {
    const checkCompare = $('.nroconvenio');
    let numero = $(this).data("nro") - 1;
    if (checkCompare[numero].checked === true) {

      data.forEach(element => {
        if (element['N°'] == id)
          resultCompare.push(element);
      });
    }
    else {
      resultCompare.pop();

    }
    console.log(resultCompare);
    localStorage.setItem('resultCompare', JSON.stringify(resultCompare))


  });
  $('#comparar').click(function () {
    let lengthCard = resultCompare.length;
    if (lengthCard < 2) {
      alert("Seleccione minimo 2 convenios");

    }
    window.location.href = 'compare.html';
  });

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
});

