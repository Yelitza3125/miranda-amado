// Initialize Firebase
var config = {
  apiKey: "AIzaSyAsb9kQKq_1uiBKsChewFZp3ELY_MG4wxc",
  authDomain: "miranda-y-amado.firebaseapp.com",
  databaseURL: "https://miranda-y-amado.firebaseio.com",
  projectId: "miranda-y-amado",
  storageBucket: "miranda-y-amado.appspot.com",
  messagingSenderId: "158203245206"
};
  firebase.initializeApp(config);
  let database = firebase.database();
  let info = database.ref('/convenios');
  let lastItem ='';
  info.on('value', function (datos) {
    lastItem = datos.val().length;
    console.log(datos.val());
    localStorage.setItem('lastItem',lastItem);
  })
  // variables
  let newSuscription = $('#suscripcion-new');
  let newCompany = $('#empresa-new');
  let newVigence = $('#vigencia-new');
  let newSindicato = $('#sindicato-new');
  let newIndustria = $('#industria-new');
  let newIncrement = $('#incremento-new');
  let newBonificacion = $('#bonificacion-new');



  const id =  parseInt(localStorage.getItem('lastItem'));
  console.log(id);
  const register = $('#new-convenio');
  let infos = database.ref('convenios/'+id );
  register.on('click',function(){
     infos.set({
      Bonificación: newBonificacion.val(), 
      Empresa: newCompany.val(),
      Incremento: newIncrement.val(),
      Industria : newIndustria.val(),
      "N°": localStorage.getItem('lastItem')+1,
      Sindicato:newSindicato.val(),
      Suscripción: newSuscription.val(),
      Tipo:'Convenio colectivo',
      Vigencia: newVigence.val(),
      URL: 'null'


    }, function () {
      console.log('Se registro correctamente');
    });
  })

