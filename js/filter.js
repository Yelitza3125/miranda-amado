// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyAsb9kQKq_1uiBKsChewFZp3ELY_MG4wxc",
//   authDomain: "miranda-y-amado.firebaseapp.com",
//   databaseURL: "https://miranda-y-amado.firebaseio.com",
//   projectId: "miranda-y-amado",
//   storageBucket: "miranda-y-amado.appspot.com",
//   messagingSenderId: "158203245206"
// };
// firebase.initializeApp(config);

// var database = firebase.database();
// var info = database.ref('convenios');
// var syndicate = document.getElementById('checkbox1');
// var industry = document.getElementById('checkbox2');
// var section = document.getElementById('section');
// var section2 = document.getElementById('section-2');
// /*Función para obtener los datos*/
// info.on('value', function(datos) {
//   // debugger;
//   data = datos.val();
//   //  Evento change al checkbox sindicato
//   syndicate.addEventListener('change', function() {
//     if(syndicate.checked === true) {
//       data.forEach(function(el) {
//         // console.log(el.Sindicato);
//         var content = el.Sindicato;
//         var div = document.createElement('div');
//         div.innerHTML = content;
//         div.className = 'filter-item-syndicate';
//         section.appendChild(div);
//         document.body.appendChild(section);
//         // console.log(section.children);
//       });
//     }
//     if(syndicate.checked === false) {
//       // debugger;
//       console.log('Desactivastes el checkbox, por lo que no se verá nada');
//       var children = document.getElementsByClassName('filter-item-syndicate');
//       section.remove();
//     }
//   });

//   industry.addEventListener('change', function() {
//     if(industry.checked === true) {
//       data.forEach(function(el) {
//         // console.log(el.Sindicato);
//         var content = el.Industria;
//         var div = document.createElement('div');
//         div.innerHTML = content;
//         div.className = 'filter-item-industry';
//         section2.appendChild(div);
//         document.body.appendChild(section2);
//         // console.log(section.children);
//       });
//     }
//     if(industry.checked === false) {
//       // debugger;
//       console.log('Desactivastes el checkboxpor segunda vez, por lo que no se verá nada de nuevo');
//       var children2 = document.getElementsByClassName('filter-item-industry');
//       section2.remove();
//     }
//   });
// });