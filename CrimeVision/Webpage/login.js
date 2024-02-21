import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth,
    signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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
      const analytics = getAnalytics(app);
const auth = getAuth();


var email = document.getElementById("email");
var password = document.getElementById("password");
window.login= function(e) {
  e.preventDefault();
  var obj = {
    email: email.value,
    password: password.value,
  };

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      alert("logged in Successfully")
      var aaaa =  (success.user.uid);
      localStorage.setItem("uid",aaaa)
      console.log(aaaa)
      
      
      
      window.location.replace('http://127.0.0.1:5000')
     // localStorage.setItem(success,user,uid)
      
    })
    .catch(function (err) {
      alert("login error"+err);
    });

  console.log(obj);
}
