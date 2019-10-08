var config = {
    apiKey: "AIzaSyAdE1BuHB-rCblMHVN6y_QogLs9BC-1fEQ",
    authDomain: "train-schedule-89dd6.firebaseapp.com",
    databaseURL: "https://train-schedule-89dd6.firebaseio.com",
    projectId: "train-schedule-89dd6",
    storageBucket: "",
    messagingSenderId: "155145658988",
    appId: "1:155145658988:web:2de71792f1c8790901ae49"
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

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });

    $("trainNameInput").val("");
    $("destinationInput").val("");
    $("trainTimeInput").val("");
    $("frequencyInput").val("");

  });