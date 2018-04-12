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
  
    var passwordLogin = $('#password-login');
    var emailLogin = $('#email-login');
    var validatePassword = false;
    var validateEmail = false;
    
  
    emailLogin.on('keyup', function(event) {
      var EMAILUSER = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
  
      if (EMAILUSER.test($(this).val())) {
        validateEmail = true;
        validateUser();
      } else {
        inactiveUser();
      }
    });
  
    passwordLogin.on('keyup', function(event) {
      if (passwordLogin.val()) {
        validatePassword = true;
        validateUser();
      } else {
        inactiveUser();
      }
    });
  
    function validateUser() {
      if (validateEmail && validatePassword) {
        $('#btn-login').attr('disabled', false);
      }
    }
  
    function inactiveUser() {
      $('#btn-login').attr('disabled', 'disabled');
    }
    
    // Autentificación por email y password
    
    $('#btn-login').click(function(event) {
      event.preventDefault();
  
      var email = emailLogin.val();
      var password = passwordLogin.val();
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
        //   alert('email y/o contraseña incorrecta');
          var errorCode = error.code;
          var errorMessage = error.message;
        });
  
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          $(location).attr('href', 'views/home.html');
        }
      });
    });
  
  
    // Login con Gmail
    var provider = new firebase.auth.GoogleAuthProvider();
    $('#btn-google').on('click', function() {
      event.preventDefault();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
  
        var user = result.user;
  
        firebase.database().ref('users/' + user.uid).set({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          profilePhoto: user.photoURL
        }).then(
          user => {
            $(location).attr('href', 'views/home.html');
          });
      }).catch(function(error) {
      // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      // ...
      });
    });