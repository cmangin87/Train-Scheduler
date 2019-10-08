var config = {
    apiKey: "AIzaSyDXLrPyvKU22E2pTYhcdLO4Y0anyMKgEWk",
    authDomain: "train-schedule2-28d63.firebaseapp.com",
    databaseURL: "https://train-schedule2-28d63.firebaseio.com",
    projectId: "train-schedule2-28d63",
    storageBucket: "",
    messagingSenderId: "368704588750",
    appId: "1:368704588750:web:117babbef9d0045208799f"
  };
  
  firebase.initializeApp(config);
  
    var database = firebase.database();

        var trainName = "";
        var destination = "";
        var trainTime = 0;
        var frequency = "";

  $("#submitBtn").on("click", function(event) {
      event.preventDefault();

    trainName = $("trainNameInput").val().trim();
    destination = $("destinationInput").val().trim();
    trainTime = $("trainTimeInput").val().trim();
    frequency = $("frequencyInput").val().trim();

        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);

        var newTrain = {
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
        };

    database.ref().push(newTrain);

    $("trainNameInput").val("");
    $("destinationInput").val("");
    $("trainTimeInput").val("");
    $("frequencyInput").val("");

  });

  database.ref().on("child_added", function(snapshot) {
      console.log(snapshot.val());

    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var trainTime = snapshot.val().trainTime;
    var frequency = snapshot.val().frequency;

        var frequency;

        var trainTime = 0;

        var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
            console.log(trainTimeConverted);
            
        var currentTime = moment();
            console.log("Current Time: " + moment(currentTime).format("HH:mm"));

        var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
            console.log("Difference in Time: " + diffTime);

        var timeRemainder = diffTime % frequency;
            console.log(timeRemainder);

        var minutesUntil = frequency - timeRemainder;
            console.log("Minutes Until Train Arrives: " + minutesUntil);

        var nextTrain = moment().add(minutesUntil, "minutes");
            console.log("Arriving at: " + moment(nextTrain).format("HH:mm"));


            $("#new-train").append("<tr><td>" + trainName +
                "</td><td>" + destination +
                "</td><td>" + frequency +
                "</td><td>" + nextTrain + 
                "</td><td>" + minutesUntil + "</td></tr>");

  },

    function(errorObject) {

            console.log("Errors handled: " + errorObject.code);
        });