// String in text box
var userInput = document.querySelector("#input-list");

// Submit button
var submitBtn = document.querySelector("#submit-btn");

// Text area where list items will be added
var list = document.querySelector("#list-items");

// Confirm button
    // No var declared here because it will be created dynamically upon submission of an item

// List item
    // No var declared here because it will be created dynamically upon submission of an item

submitBtn.addEventListener("click", function(event) {

    // Prevents the page from being reloaded
    event.preventDefault();

    // Checks to see if userInput is empty. If empty, does not continue.
    if (userInput.value === "") {
        return
    }

    // Creates new list element.
    var newItem = document.createElement("li");

    // Copies user input to the text content of the new list item.
    newItem.textContent = userInput.value;

    // Clears the user submission text box.
    userInput.value = "";

    // Creates a new button to be appended to the list item
    var newBtn = document.createElement("button");

    // Adds text to the button
    newBtn.innerHTML = "Complete";

    // Creates a function for the button that deletes the list element it is the parent of
    newBtn.onclick = function() {
        list.removeChild(newItem);
    }

    // Attaches the button as a child of the list
    newItem.appendChild(newBtn);

    // Attaches the new list item as a child of the unordered list
    list.appendChild(newItem);

    // Adds styling for the button
    newBtn.classList.add("btn");
    newBtn.classList.add("btn-success");
    newBtn.style.margin = "16px";

    // Adds styling for the list item
    newItem.classList.add("justify-content-center");

});