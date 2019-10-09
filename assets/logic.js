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
        var trainTime = "";
        var frequency = 0;

  $("#submitBtn").on("click", function (event) {
      event.preventDefault();

    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    trainTime = $("#trainTimeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);

        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
  })

  database.ref().on("child_added", function (childSnapshot) {
      console.log(childSnapshot.val());
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().trainTime);
      console.log(childSnapshot.val().frequency);
   
        trainTime = childSnapshot.val().trainTime;
        frequency = childSnapshot.val().frequency;

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


            $("#new-train").append(" <tr class='display'><td id='train-display'> " + childSnapshot.val().trainTime +
                " </td><td id='destination-display'> " + childSnapshot.val().destination +
                " </td><td id='frequency-display'> " + childSnapshot.val().frequency +
                " </td><td id='time-display'> " + moment(nextTrain).format("HH:mm") + 
                " </td> + <td id='arrival'> " + minutesUntil + "</tr>");

  }, function(errorObject) {

            console.log("Errors handled: " + errorObject.code);
        });

   