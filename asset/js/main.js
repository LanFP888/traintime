const ratio = 0.3;

//initialize firebase
var config = {
  authDomain: "traintime-a592f.firebaseapp.com",
  databaseURL: "https://traintime-a592f.firebaseio.com",
  projectId: "traintime-a592f",
  storageBucket: "",
  messagingSenderId: "294403762944"
};
firebase.initializeApp(config);

const db = firebase.database();
const trainRef = db.ref("/train");

//add the data to the page when new element is added to firebase
trainRef.on("child_added", function(snapshot) {
  let train = snapshot.val();
  console.log(train);
  //create the elements (have to be this way because firebase automatically orders the object keys alphabetically)
  let tableRow = $("<tr>", {
    class: "scheduleTable"
  });
  let trainName = $("<td>", {
    html: train.trainName,
    value: train.trainName
  });
  let destination = $("<td>", {
    html: train.destination,
    value: train.destination
  });
  let frequency = $("<td>", {
    html: train.frequency,
    value: train.frequency
  });
  let nextArrival = $("<td>", {
    html: train.nextArrival,
    value: train.nextArrival
  });
  let minsAway = $("<td>", {
    html: train.minsAway,
    value: train.minsAway
  });
  //style the letters
  styleSchedule(trainName);
  styleSchedule(destination);
  styleSchedule(frequency);
  styleSchedule(nextArrival);
  styleSchedule(minsAway);
  $("#scheduleTableBody").append(
    tableRow.append(trainName, destination, frequency, nextArrival, minsAway)
  );
});

//handles the submit button click event and send to database
$(".submitSchedule").on("click", function(event) {
  event.preventDefault();
  //get the information from the text boxes and store them in an object
  const train = {
    trainName: $("#trainNameInput").val(),
    destination: $("#destinationInput").val(),
    frequency: $("#frequencyInput").val(),
    nextArrival: "5:40",
    minsAway: "5"
  };

  trainRef.push(train);
});

function styleSchedule(element) {
  element.splitFlap({
    charWidth: 50 * ratio,
    charHeight: 100 * ratio,
    imageSize: 2500 * ratio + "px " + 100 * ratio + "px"
  });
}

//import moment.js to calculate time and difference in minutes
//update the minsAway every minute
