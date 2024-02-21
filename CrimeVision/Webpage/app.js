
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth,
    createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA0bkgDmX-LTfK2c6sdYxMNpj9QVPX-Oi8",
    authDomain: "sample2-ad557.firebaseapp.com",
    projectId: "sample2-ad557",
    storageBucket: "sample2-ad557.appspot.com",
    messagingSenderId: "1043760295381",
    appId: "1:1043760295381:web:66c6208c2f90b2948c215c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth()
  var fullName = document.getElementById("fullname");
//var contact = document.getElementById("contact");
var email = document.getElementById("email");
var password = document.getElementById("password");
var copassword = document.getElementById("copassword")
window.signup = function (e) {
    if(password)
    
        if(fullName.value == ""  || email.value =="" || password.value ==""){
            alert("All Field Are Required")
        }
        if(password.value == copassword.value){
         
        }
        else{
            alert("Password Confirmation is Wrong")
            return false
        }
    
        e.preventDefault();
        var obj = {
          firstName: fullName.value,
          //contact: contact.value,
          email: email.value,
          password: password.value,
        };
      
        createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function(success){
            window.location.replace('/login.html')
          // console.log(success.user.uid)
          alert("sign up successfull")
        })
        .catch(function(err){
          alert("Error in " + err)
        });
       console.log()
        console.log(obj);
      };