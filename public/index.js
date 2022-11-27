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

  function saveAndUpdate(thisIsACategory){
    save(thisIsACategory);
    newMessage(currentResponse);
  }

  let currentResponse;
  let messageCountSports = 0;
  function save(thisIsACategory){

    var response = document.getElementById('response').value
    currentResponse = response;

    let theMessageCount;
    if(thisIsACategory=='sports'){
      messageCountSports++;
      theMessageCount = messageCountSports;
    }

    database.ref('palisade/' + 'responses/' + thisIsACategory+'/' + 'message'+ theMessageCount).set({
      message: response
    })
  }

  let userResponses = getElementById('user-responses');
  function newMessage(theCurrentResponse){
    var para = document.createElement("p");
    para.innerText = theCurrentResponse;
    document.userResponses.appendChild(para);
  }