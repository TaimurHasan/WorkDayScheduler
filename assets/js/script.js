var today = moment().format("dddd, MMMM Do");

// find p element in header and add current day to it
$("#currentDay")
    .text(today);
