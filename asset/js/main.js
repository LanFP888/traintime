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

$(document).ready(function() {
  setInterval(updateTime, 60 * 1000);
});

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
    class: "frequency",
    html: train.frequency,
    value: train.frequency
  });
  let nextArrival = $("<td>", {
    class: "nextArrival",
    html: calculateNextArrival(
      calculateMinsAway(train.trainStartTime, train.frequency)
    ),
    value: calculateNextArrival(
      calculateMinsAway(train.trainStartTime, train.frequency)
    )
  });
  let minsAway = $("<td>", {
    class: "minsAway",
    html: calculateMinsAway(train.trainStartTime, train.frequency),
    value: calculateMinsAway(train.trainStartTime, train.frequency)
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
    nextArrival: calculateNextArrival(
      calculateMinsAway(
        $("#trainStartTimeInput").val(),
        $("#frequencyInput").val()
      )
    ),
    minsAway: calculateMinsAway(
      $("#trainStartTimeInput").val(),
      $("#frequencyInput").val()
    ),
    trainStartTime: $("#trainStartTimeInput").val()
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

function calculateMinsAway(startTime, frequency) {
  let minsAway =
    frequency -
    (moment().diff(moment(startTime, "HH:mm"), "minutes") % frequency);
  return minsAway;
}

function calculateNextArrival(minsAway) {
  return moment(moment().add(minsAway, "minutes")).format("HH:mm");
}

//updates the min and Time Arrival (every minute)
function updateTime() {
  $(".scheduleTable").each(function() {
    //reduce the min until next arrival by 1
    let min = $(this)
      .find(".minsAway")
      .attr("value");
    min--;

    let next = $(this)
      .find(".nextArrival")
      .attr("value");

    let freq = $(this)
      .find(".frequency")
      .attr("value");

    // update the nextArrival time if min reaches 0
    if (min === 0) {
      let newTime = moment(moment(next, "HH:mm").add("minutes", freq)).format(
        "HH:mm"
      );
      console.log(newTime);
      $(this)
        .find(".nextArrival")
        .attr("value", newTime.toString());

      $(this)
        .find(".nextArrival")
        .html(newTime.toString());
      styleSchedule($(this).find(".nextArrival"));
    }

    //refresh the minute by the interval
    if (min < 0) {
      min = freq;
    }

    $(this)
      .find(".minsAway")
      .attr("value", min);

    $(this)
      .find(".minsAway")
      .html(min);
  });

  styleSchedule($(".minsAway"));
}
