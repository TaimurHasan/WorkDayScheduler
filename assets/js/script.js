// create object to save calendar items
var savedItems = {
    "9AM": "",
    "10AM": "",
    "11AM": ""
};

var today = moment().format("dddd, MMMM Do");

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
    $(".textBox").trigger("blur")
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
    
    savedItems[selectedTime] = selectedText;
    console.log(savedItems);
    localStorage.setItem("items", JSON.stringify(savedItems))

}

var loadItems = function () {
    var savedItems = JSON.parse(localStorage.getItem("items"))
    console.log(savedItems);

    if (!savedItems) {
        savedItems = {
            "9AM": "",
            "10AM": "",
            "11AM": ""
        };
    }


    $.each(savedItems, function(list, arr) {
        console.log(list, arr);
        var text = arr;
        var time = list;
        
        var id = time;

        var test = $("#" + id)
            .find(".textBox")
            .children("p")
            .text(text);


        
        console.log(test)
    })

}

$(".saveBtn").on("click", saveItem);

loadItems();