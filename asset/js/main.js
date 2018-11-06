const maxCharTime = 5
const maxCharMin = 4
const maxCharTrainName = 25
const maxCharDest = 18

var test = [
    {
        // trainName: "Train Name",
        // destination: "Destination",
        // frequency: "Frequency",
        // time: "Arrival Time",
        // minutesAway: "Next Train (min)",

    },
    {
        trainName: "Trenton Express",
        destination: "London",
        frequency: "25",
        time: "12:38",
        minutesAway: "10",

    },
    {
        trainName: "Oregon Trail",
        destination: "Mississippi",
        frequency: "25",
        time: "12:38",
        minutesAway: "10",

    },
    {
        trainName: "Midnight Carriage",
        destination: "Philadelphia",
        frequency: "25",
        time: "12:00",
        minutesAway: "10",

    },
    {
        trainName: "Sing Sing Caravan",
        destination: "Atlanta",
        frequency: "25",
        time: "12:38",
        minutesAway: "10",

    },
    {
        trainName: "California Caravan",
        destination: "San Francisco",
        frequency: "25",
        time: "12:38",
        minutesAway: "10",

    },
]
var ratio = 0.3;
$(document).ready(function () {
    $(".test").splitFlap({
        charWidth: 50 * ratio,
        charHeight: 100 * ratio,
        imageSize: (2500 * ratio) + 'px ' + (100 * ratio) + 'px'
    })
})

for (i = 0; i < test.length; i++) {
    // createNewRow()
    var tableRow = $('<tr>', {
        class: "scheduleTable",
    })

    $.each(test[i], function (k, v) {
        var trainInstance = $("<td>", {
            class: "test",
            html: v
        })
        $("#scheduleTableBody").append(tableRow.append(trainInstance))
    });

    // var timeBoard = $("<td>", {
    //     class: "test",
    //     html: test[i].time
    // })
    // var timeBoard = $("<td>", {
    //     class: "test",
    //     html: test[i].time
    // })
    // var timeBoard = $("<td>", {
    //     class: "test",
    //     html: test[i].time
    // })
    // var timeBoard = $("<td>", {
    //     class: "test",
    //     html: test[i].time
    // })



}


// function createNewRow() {
//     var tableRow = $('<tr>')
//     var trainNameDiv = $("<td>", {
//         id: "trainName",
//         class: "departure-board",
//     })
//     var destinationDiv = $("<td>", {
//         id: "destination",
//         class: "departure-board",
//     })
//     var frequency = $("<td>", {
//         id: "frequency",
//         class: "departure-board",
//     })
//     var timeDiv = $("<td>", {
//         id: "time",
//         class: "departure-board",
//     })
//     var minAway = $("<td>", {
//         id: "minAway",
//         class: "departure-board",
//     })
    // $(".trainSchedule").append(timeDiv)
    // $("#tableHeader").append(trainNameDiv)
    // $(".scheduleTable").append(tableRow.append(trainNameDiv, destinationDiv, frequency, timeDiv, minAway))
// }
