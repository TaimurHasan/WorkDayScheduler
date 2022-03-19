var today = moment().format("dddd, MMMM Do");

// find p element in header and add current day to it
$("#currentDay")
    .text(today);

$(".textBox").on("click", function(){
    var text = $(this)
        .text()
        .trim()

    console.log(text);
})