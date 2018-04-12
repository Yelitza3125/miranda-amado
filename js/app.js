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
        
        <div class="col-12 col-lg-3 box"><div class="card bg-light mb-3" >
         
      <div class="card-header">
      <div class="row">
      <div class="col-9 col-lg-9">
      <p>${element.Empresa}</p>
      </div>
      <div class="col-3 col-lg-3">
        <div class="form-check">
         <label class="form-check-label">
          <input type="checkbox" class="form-check-input nroconvenio" data-nro=${element["N°"]}>
        </label>
        </div>
      </div>
      </div>
      </div>
      
      
  
   
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
  $('.buscar').click(function () {
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


$('#suscripcion1').click(function () {
  // ("#sprints").change(function () {
  nsprint = $('select[id=suscripcion1]').val();
  console.log(nsprint);
  // $('#sprints').val($(this).val());
})




function filterSuscription(date) {
  let resultSuscription = [];
  info.on('value', function (datos) {
    data = datos.val();

    data.forEach(function (element) {
      if ((element.Suscripción).toString().substr(0, 4) === date) {
        // console.log((element.Suscripción).substr(0, 4))
        resultSuscription.push(element);

      }
    });
    localStorage.setItem('resultSuscription', JSON.stringify(resultSuscription))

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

// Filtro por Sindicato

function filterSyndicate(syndicate) {
  let resultSyndicate = [];
  info.on('value', function(datos) {
    data = datos.val();
    data.forEach(element => {
      if(element.Sindicato === syndicate) {
        resultSyndicate.push(element);
      }
    });
    localStorage.syndicate = JSON.stringify(resultSyndicate);
  });
}

// Filtro por Industria

function filterIndustry(industry) {
  let resultIndustry = [];
  info.on('value', function(datos) {
    data = datos.val();
    data.forEach(el => {
      if(el.Industria === industry) {
        resultIndustry.push(el);
      }
    });
    localStorage.industry = JSON.stringify(resultIndustry);
  });
}



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

info.on('value', function (datos) {
  data = datos.val();
  // Mostrar los 20 primeros
  let news = data.slice(0, 19);
  
  news.forEach(element => {
    let fecha = element.Suscripción;
    let fechames = fecha.slice(0, 10);
    let tem = `<div class="col-12 col-lg-4"><div class="container-convenio m-3">
    <div class="titulo-container">
     <p class="titulo-text text-blue-miranda">${element.Empresa}</p>
     <input type="checkbox" aria-label="Checkbox for following text input" data-nro=${element["N°"]-1} >
    </div> 
     
    <div class="convenio-detalles">
     <p class="text-gold-amado">Suscripción: <span class="text-blue-miranda">${fechames}</span></p>
     <p class="text-gold-amado">Industria:
     <span class="text-blue-miranda">${element.Industria}</span> </p>
    </div>
  
    <div class="botones-container">
      <button class="btn btn-detalles">
      Ver detalles
      </button>
      <button class="btn btn-pdf text-blue-miranda"> Ver PDF
      </button>
    </div>
    </div>
   </div>`
    

    $('#container-box').append(tem);
    $('.btn-pdf').click(function () {
      window.open(`${element.URL}`, '_blank');
    });

  });

  let resultCompare = [];



  $('.nroconvenio').click(function () {
    const checkCompare = $('.nroconvenio');
    let numero = $(this).data("nro");
    if (checkCompare[numero].checked === true) {
      info.on('value', function (datos) {
        data = datos.val();
        data.forEach(elem => {
         
          if (elem['N°']-1 == numero){
          resultCompare.push(data[numero]);
         
          }
        
        });
      });
    } else {
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
// Seleccion de vigencia

let nameSelectVigencia = false;
const checkVigencia = $('#vigencia-check');

checkVigencia.on('change', function () {

  if (checkVigencia[0].checked === true) {
    nameSelectVigencia = true;
    $('#vigencia').addClass("show");
    $('#vigencia').removeClass("hide");
  } else {
    nameSelectVigencia = false;
    $('#vigencia').removeClass("show");
    $('#vigencia').addClass("hide");
  }

});





// // Selección de Empresa
const selectCompany = $('#select-company');
let nameCompany = '';

selectCompany.change(function () {
  let selectName = $('select[id=select-company]').val();
  nameCompany = selectName;

});

// Mostrar los filtros escogidos en el modal

let syndicate = document.getElementById('checkbox1');
let industry = document.getElementById('checkbox2');
let selectSyndicates = $('#select-syndicates');
let selectIndustries = $('#select-industries');

let nameSelectSyndicate = false;
syndicate.addEventListener('change', function () {
  if (syndicate.checked === true) {
    nameSelectSyndicate = true;
    selectSyndicates.addClass('show');
    selectSyndicates.removeClass('hide');
  }

  if (syndicate.checked === false) {
    nameSelectSyndicate = false;
    selectSyndicates.addClass('hide');
    selectSyndicates.removeClass('show');
  }
});

let nameSelectIndustry = false;

industry.addEventListener('change', function () {
  if (industry.checked === true) {
    nameSelectIndustry = true;
    selectIndustries.addClass('show');
    selectIndustries.removeClass('hide');
  }
  if (industry.checked === false) {
    nameSelectIndustry = false;
    selectIndustries.addClass('hide');
    selectIndustries.removeClass('show');
  }
});

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

// Seleccionar tipo de filtro solo por año de suscripcion
let nameSelectSuscripcion = false;
const checkSuscripcion = $('#suscription-check');
checkSuscripcion.on('change', function () {

  if (checkSuscripcion[0].checked === true) {
    nameSelectSuscripcion = true;
    $('#suscripcion').addClass("show");
    $('#suscripcion').removeClass("hide");
  } else {
    nameSelectSuscripcion = false;
    $('#suscripcion').removeClass("show");
    $('#suscripcion').addClass("hide");
  }

});



let ageVigence = '';

$('#vigencia1').change(function () {
  let selectAge = $('select[id=vigencia1]').val();
  ageVigence = selectAge;

});

let suscripcion = '';

$('#suscripcion1').change(function () {
  let selectsuscripcion1= $('select[id=suscripcion1]').val();
  suscripcion = selectsuscripcion1;

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
      let tem = `<div class="col-12 col-lg-4"><div class="container-convenio m-3">
      <div class="titulo-container">
       <p class="titulo-text text-blue-miranda">${element.Empresa}</p>
       <input type="checkbox" aria-label="Checkbox for following text input" data-nro=${element["N°"]-1} >
      </div> 
       
      <div class="convenio-detalles">
       <p class="text-gold-amado">Suscripción: <span class="text-blue-miranda">${fechames}</span></p>
       <p class="text-gold-amado">Industria:
       <span class="text-blue-miranda">${element.Industria}</span> </p>
      </div>
    
      <div class="botones-container">
        <button class="btn btn-detalles">
        Ver detalles
        </button>
        <button class="btn btn-pdf text-blue-miranda"> Ver PDF
        </button>
      </div>
      </div>
     </div>`
      
  
      $('#container-box').append(tem);
      $('.btn-pdf').click(function () {
        window.open(`${element.URL}`, '_blank');
      });
    });
  }
  if(nameSelectSyndicate === true) {
    console.log('hola');
    filterSyndicate($('select[id=select-2]').val());
    let dataSyndicate = localStorage.syndicate;
    let arraySyndicate = JSON.parse(dataSyndicate);
    arraySyndicate.forEach(element => {
      let fecha = element.Suscripción;
      let fechames = fecha.slice(0, 10);
      let tem = `<div class="col-12 col-lg-4"><div class="container-convenio m-3">
    <div class="titulo-container">
     <p class="titulo-text text-blue-miranda">${element.Empresa}</p>
     <input type="checkbox" aria-label="Checkbox for following text input" data-nro=${element["N°"]-1} >
    </div> 
     
    <div class="convenio-detalles">
     <p class="text-gold-amado">Suscripción: <span class="text-blue-miranda">${fechames}</span></p>
     <p class="text-gold-amado">Industria:
     <span class="text-blue-miranda">${element.Industria}</span> </p>
    </div>
  
    <div class="botones-container">
      <button class="btn btn-detalles">
      Ver detalles
      </button>
      <button class="btn btn-pdf text-blue-miranda"> Ver PDF
      </button>
    </div>
    </div>
   </div>`
    

    $('#container-box').append(tem);
    $('.btn-pdf').click(function () {
      window.open(`${element.URL}`, '_blank');
    });
    });
  }
  // Filtrando empresas según la industria a la que pertenecen
  if(nameSelectIndustry === true) {
    console.log('hola');
    filterIndustry($('select[id=select-3]').val());
    let dataIndustry = localStorage.industry;
    let arrayIndustry = JSON.parse(dataIndustry);
    arrayIndustry.forEach(element => {
      let fecha = element.Suscripción;
      let fechames = fecha.slice(0, 10);
      let template2 = `<div class="col-12 col-lg-4"><div class="container-convenio m-3">
      <div class="titulo-container">
       <p class="titulo-text text-blue-miranda">${element.Empresa}</p>
       <input type="checkbox" aria-label="Checkbox for following text input" data-nro=${element["N°"]-1} >
      </div> 
       
      <div class="convenio-detalles">
       <p class="text-gold-amado">Suscripción: <span class="text-blue-miranda">${fechames}</span></p>
       <p class="text-gold-amado">Industria:
       <span class="text-blue-miranda">${element.Industria}</span> </p>
      </div>
    
      <div class="botones-container">
        <button class="btn btn-detalles">
        Ver detalles
        </button>
        <button class="btn btn-pdf text-blue-miranda"> Ver PDF
        </button>
      </div>
      </div>
     </div>`
      
  
      $('#container-box').append(template2);
      $('.btn-pdf').click(function () {
        window.open(`${element.URL}`, '_blank');
      });
    });
  }
  if (nameSelectVigencia === true) {
    filterVigence(ageVigence);
    let dataResult = localStorage.resultDateVig;
    let array = JSON.parse(dataResult);
    array.forEach(element => {
      let fecha = element.Suscripción;
      let fechames = fecha.slice(0, 10);
      let tem = `<div class="col-12 col-lg-4"><div class="container-convenio m-3">
    <div class="titulo-container">
     <p class="titulo-text text-blue-miranda">${element.Empresa}</p>
     <input type="checkbox" aria-label="Checkbox for following text input" data-nro=${element["N°"]-1} >
    </div> 
     
    <div class="convenio-detalles">
     <p class="text-gold-amado">Suscripción: <span class="text-blue-miranda">${fechames}</span></p>
     <p class="text-gold-amado">Industria:
     <span class="text-blue-miranda">${element.Industria}</span> </p>
    </div>
  
    <div class="botones-container">
      <button class="btn btn-detalles">
      Ver detalles
      </button>
      <button class="btn btn-pdf text-blue-miranda"> Ver PDF
      </button>
    </div>
    </div>
   </div>`
    

    $('#container-box').append(tem);
    $('.btn-pdf').click(function () {
      window.open(`${element.URL}`, '_blank');
    });
    });
  }

  if (nameSelectSuscripcion === true) {
    filterSuscription(suscripcion);
    let dataResult = localStorage.resultSuscription;
    let array = JSON.parse(dataResult);
    array.forEach(element => {
      let fecha = element.Suscripción;
      let fechames = fecha.slice(0, 10);
      let tem = `<div class="col-12 col-lg-4"><div class="container-convenio m-3">
    <div class="titulo-container">
     <p class="titulo-text text-blue-miranda">${element.Empresa}</p>
     <input type="checkbox" aria-label="Checkbox for following text input" data-nro=${element["N°"]-1} >
    </div> 
     
    <div class="convenio-detalles">
     <p class="text-gold-amado">Suscripción: <span class="text-blue-miranda">${fechames}</span></p>
     <p class="text-gold-amado">Industria:
     <span class="text-blue-miranda">${element.Industria}</span> </p>
    </div>
  
    <div class="botones-container">
      <button class="btn btn-detalles">
      Ver detalles
      </button>
      <button class="btn btn-pdf text-blue-miranda"> Ver PDF
      </button>
    </div>
    </div>
   </div>`
    

    $('#container-box').append(tem);
    $('.btn-pdf').click(function () {
      window.open(`${element.URL}`, '_blank');
    });
    });
  }
})
