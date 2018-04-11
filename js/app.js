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

var database = firebase.database();
var info = database.ref('convenios');
var sindicato = document.getElementById('checkbox1');
var industry = document.getElementById('checkbox2');
var section = document.getElementById('section');
/*Función para obtener los datos*/
info.on('value', function(datos) {
  // debugger;
  data = datos.val();
  //  Evento change al checkbox sindicato
  sindicato.addEventListener('change', function() {
    if(sindicato.checked === true) {
      // var section = document.createElement('section');
      // section.id='section';
      // console.log(data);
      data.forEach(function(el) {
        // console.log(el.Sindicato);
        var content = el.Sindicato;
        var div = document.createElement('div');
        div.innerHTML = content;
        div.className = 'filter-item';
        section.appendChild(div);
        document.body.appendChild(section);
        // console.log(section.children);
      });
    }
    if(sindicato.checked === false) {
      // debugger;
      console.log('Desactivastes el checkbox, por lo que no se verá nada');
      var children = document.getElementsByClassName('filter-item');
      section.remove();
    }
  });

  
});