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

  /*function saveAndUpdate(thisIsACategory){
    save(thisIsACategory);
    newMessage(currentResponse);
  }
  */

  let currentResponse;
  let messageCountSports = 0;
  function save(thisIsACategory){

    var response = document.getElementById('response').value
    currentResponse = response;

    let messageID = ' ' + new Date().getTime();

    database.ref('palisade/' + thisIsACategory+'/' + messageID).set({
      messageID: messageID,
      message: response,
      user: 1
    })
    render(thisIsACategory);
  }

  //viewing/rendering the user-responses
  function render(thisIsACategory) {
    const userResponses = document.getElementById('user-responses');
    userResponses.innerHTML = '';

    const responseReference = database.ref('palisade/' + thisIsACategory)
    responseReference.on('value', function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        let childSnapVal = childSnapshot.val();
        let childMessageID = childSnapshot.key;

        let childMessage = childSnapVal.message;
        let element = document.createElement('p');
        element.innerText = childMessage;
        element.id = childMessageID;
        element.className = "response";
        userResponses.appendChild(element);
      });
    });
  }