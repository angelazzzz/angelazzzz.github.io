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

  function setUserID(){
    if(localStorage.getItem('user')===null)
      {let userID=uuidv4();
        localStorage.setItem('user', userID);
      }
  }

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  
  function save(thisIsACategory){

    var response = document.getElementById('usermessage').value;

    let messageID = new Date().getTime();
    let user = localStorage.getItem('user');

    database.ref('palisade/' + thisIsACategory+'/' + messageID).set({
      message: response,
      user: user
    })
    render(thisIsACategory);
  }

  function saveReply(thisIsACategory, messageID){

    var reply = document.getElementById(messageID).value;

    let replyID = new Date().getTime();

    let userID;
    let usersID = localStorage.getItem('user');

    let responseReference = database.ref('palisade/' + thisIsACategory + '/' + messageID)
    responseReference.on('value', function(snapshot){
      let snapVal = snapshot.val();
      userID = snapVal.user;
    });
    if(usersID!==userID){
      database.ref('palisade/' + thisIsACategory+'/' + messageID + '/replies/' + replyID).set({
        reply: reply,
        user: userID
      });
    } else {
      alert("You can't reply to your own message!");
    }
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

        // NOTE: the response section is created for each element here
        let responseDiv = document.createElement('div');
        responseDiv.className = "response-container";

        let responseMsg = document.createElement('p');
        responseMsg.innerText = childMessage;
        responseMsg.className = "response-msg";

        let responseRepliesDiv = document.createElement('div');
        responseRepliesDiv.className = "response-replies-div";

        let responseReplyButton = document.createElement('button');
        responseReplyButton.addEventListener("click", function saveIt(){
          saveReply(thisIsACategory, childMessageID);
        });
        responseReplyButton.className = "response-reply-button";

        let responseReplyButtonImg = document.createElement('img');
        responseReplyButtonImg.src = "reply-icon.png"
        responseReplyButtonImg.className = "response-reply-button-img";

        let responseReplyInput = document.createElement('input');
        responseReplyInput.id = childMessageID;
        responseReplyInput.type = 'text';
        responseReplyInput.placeholder = "Enter your response";
        responseReplyInput.className = "response-reply-input";

        responseDiv.appendChild(responseMsg);
        responseReplyButton.appendChild(responseReplyButtonImg);
        responseRepliesDiv.appendChild(responseReplyButton);
        responseRepliesDiv.appendChild(responseReplyInput);
        responseDiv.appendChild(responseRepliesDiv);
        userResponses.appendChild(responseDiv);
      });
    });
  }

  /*
  OUTLINE OF PLAN:
  - every time someone replies to a user's message,
   the user gets a popup containing the reply,
    asking the user if they want to accept or decline
  - accept: head to chat.html
    -> this is opened in a new tab

  OUTLINE OF CHAT PLAN:
  so! currently on chat.html
  - store startTime and currentTime
    -> perhaps on local storage>
    -> millis() perhaps
  - constantly compare startTime and currentTime
  - once the difference between them reaches 2 minutes,
    another popup appears for both users to continue/stop talking
  - continue: no time limit, talk as much as they like,
    until they press a button that takes them back to categories.html
  - stop talking: takes them back to categories.html
  
  */

  
  function checkIfChanged(thisIsACategory) {
    const userResponses = document.getElementById('user-responses');
    userResponses.innerHTML = '';

    const repliesRef = database.ref('palisade/' + thisIsACategory)
    repliesRef.on('value', function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        let childSnapVal = childSnapshot.val();
        let childMessageID = childSnapshot.key;
        let childUser = childSnapVal.user;
        if(childUser===localStorage.getItem('user')){
          if(childSnapVal.replies!==undefined){
            let childReplies = childSnapVal.replies;
              for(eachReply in childReplies){
                const thing = childReplies[eachReply];
                let thingReply = thing.reply;
                userConfirm(childSnapVal.message, thingReply);
                //userConfirm(childSnapVal.message, childSnapshot.child('replies').child(eachReply).val().reply);
                //let removeThis = childSnapshot.child('replies').child(eachReply);
                let removeThisRef = database.ref('palisade/' + thisIsACategory+'/' + childMessageID + '/replies/' + eachReply);
                removeThisRef.remove();
              }
          }
        }
      });
    });

  }

  //NOTE: make it so that every time the data changes
  //https://www.w3schools.com/js/js_popup.asp
  function userConfirm(message, reply) {
    if (confirm("Someone replied to \"" + message + "\" with \"" + reply + "\". Would you like to chat with them?")) {
      //NEED TO DO: OPEN A CHAT WITH THE TWO USERS INVOLVED
      //how to get the user who got replied to's user ID: localStorage.getItem('user');
      //how to get the user who replied's user ID: to be determined
      window.open("chat.html");
    } else {
      window.location.href='categories.html';
    }
  }

  //setInterval(checkIfChanged, 10000);