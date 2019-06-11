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

  database.ref().on("child_added", function(childSnapshot) {
    var trainFreq = childSnapshot.val().frequency;    
    var firstTrain = childSnapshot.val().first;
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    var tRemainder = diffTime % trainFreq;
    var tMinutesTillTrain = trainFreq - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var row = $("<tr>");
    var tname = $("<td>").text(childSnapshot.val().name);
    var tdest = $("<td>").text(childSnapshot.val().destination);
    var tnext = $("<td>").text(tMinutesTillTrain);
    var tfreq = $("<td>").text(trainFreq);
    var tmin = $("<td>").text(moment(nextTrain).format("HH:mm"));
    var trow = row.append(tname, tdest, tfreq, tmin, tnext);
    $("tbody").append(trow);

  })