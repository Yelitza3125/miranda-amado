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
/*Función para obtener los datos*/
info.on('value', function(datos) {
  data = datos.val();
  console.log(data);
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

