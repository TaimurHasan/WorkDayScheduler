// create object to save calendar items
var savedItems = {};

var today = moment().format("dddd, MMMM Do");
var currentTime = parseInt(moment().format('H'))
console.log(currentTime);

// find p element in header and add current day to it
$("#currentDay")
    .text(today);

var createItem = function () {
    var text = $(this)
        .text()
        .trim()

    var textInput = $("<textarea>")
        .addClass("m-0")
        .val(text)

    $(this).replaceWith(textInput);
    textInput.trigger("focus");
}

$(".textBox").on("click", "p", createItem)

var confirmItem = function(text, id){
    var text = $(this)
        .val()
        .trim()

    var id = $(this)
        .closest(".row")
        .attr("id")

    var pReturn = $("<p>")
        .attr("data-time", id)
        .addClass("my-auto h-75 w-100 pt-3")
        .text(text);

    $(this).replaceWith(pReturn);
    
}

$(".textBox").on("blur", "textarea", confirmItem)

var saveItem = function(event) {
    console.log(savedItems);

    var selectedParent =$(event.target)
        .closest(".row")

    var selectedTime = selectedParent
        .attr("id")

    var selectedText = selectedParent
        .children(".textBox")
        .children("p")
        .text()

    console.log(selectedText)
    console.log(selectedTime)
    
    savedItems[selectedTime] = selectedText

    console.log(savedItems);
    localStorage.setItem("items", JSON.stringify(savedItems))

}

var loadItems = function () {
    var savedItems = JSON.parse(localStorage.getItem("items"))

    // if (!savedItems) {
    //     savedItems = [];
    // }


    $.each(savedItems, function(list, arr) {

        var test = $("#" + list)
            .find(".textBox")
            .children("p")
            .text(arr);

    })
}

$(".saveBtn").on("click", saveItem);

loadItems();

var timeItems = function () {
    var selection = $(".row").each(function() {
        
        var theTime = parseInt($(this)
            .attr("id"))
        
        console.log(theTime)

        
        
        if(currentTime > theTime) {
            console.log("yes")
            
            check = $(this)
                .find(".textBox")
                .addClass("past-item")

        } else if (currentTime < theTime) {
            check = $(this)
                .find(".textBox")
                .addClass("future-item")
        } else if (currentTime === theTime) {
            check = $(this)
            .find(".textBox")
            .addClass("current-item")
        }
    })
}

timeItems();