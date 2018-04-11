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

