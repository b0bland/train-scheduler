  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCV4PCOZM7I3lTo-trs-Ur5yfbOpddbjGw",
    authDomain: "funky-f48ad.firebaseapp.com",
    databaseURL: "https://funky-f48ad.firebaseio.com",
    projectId: "funky-f48ad",
    storageBucket: "funky-f48ad.appspot.com",
    messagingSenderId: "915541038910",
    appId: "1:915541038910:web:105d16f36335da85"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#submit").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var trainDest = $("#destination").val().trim();
    var trainFirst = $("#first-train").val().trim();
    var trainFreq = $("#frequency").val().trim();

    var trainNewLine = {
        name: trainName,
        destination: trainDest,
        first: trainFirst,
        frequency: trainFreq
    }

    database.ref().push(trainNewLine)

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

  })