// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWaE78UPPXCIjhtYEe3vHP1XsE-K8-L6U",
  authDomain: "feelings---lauv.firebaseapp.com",
  databaseURL: "https://feelings---lauv-default-rtdb.firebaseio.com",
  projectId: "feelings---lauv",
  storageBucket: "feelings---lauv.appspot.com",
  messagingSenderId: "633506281829",
  appId: "1:633506281829:web:dbeaf46690683f4c21c98c",
  measurementId: "G-VZEYQ2KSB1"
};
  
  firebase.initializeApp(firebaseConfig);

  var database=firebase.database()

  function save(){

    var response = document.getElementById('response').value

    database.ref('palisade/' + 'responses/' + response).set({
      message: response
    })
  }