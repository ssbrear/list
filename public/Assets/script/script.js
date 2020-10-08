// String in text box
var userInput = document.querySelector("#input-list");

// Submit button
var submitBtn = document.querySelector("#submit-btn");

// Clear button
var clearBtn = document.querySelector("#clear-btn");

// Text area where list items will be added
var list = document.querySelector("#list-items");

// Confirm button
    // No var declared here because it will be created dynamically upon submission of an item

// List item
    // No var declared here because it will be created dynamically upon submission of an item

// Array to store and retrive data from local storage
var arr = [];

init();

function init() {
    var fromStorage = JSON.parse(localStorage.getItem("list"));
    if (fromStorage == null) {
        console.log("Nothing in storage");
        return
    }
    arr = fromStorage;
    render();
}

function render() {
    list.innerHTML = "";
    if ((arr != null)&&(arr.length > 0)) {
        for (var i = 0; i < arr.length; i++) {
            //// NEW LIST ITEM
            // Creates new list element.
            var newItem = document.createElement("li");
            // Copies user input to the text content of the new list item.
            newItem.textContent = arr[i];
            // Attaches the new list item as a child of the unordered list
            list.appendChild(newItem);
    
            //// BUTTON
            // Creates a new button to be appended to the list item
            var newBtn = document.createElement("button");
            // Adds text to the button
            newBtn.textContent = "Complete";
            newBtn.index = i;
            // Creates a function for the button that deletes the list element it is the parent of
            newBtn.onclick = function() {
                arr.splice(this.index, 1);
                localStorage.setItem("list", JSON.stringify(arr));
                render();
            }
            // Adds styling for the button
            newBtn.classList.add("btn");
            newBtn.classList.add("btn-success");
            newBtn.style.margin = "16px";
            // Attaches the button as a child of the list
            newItem.appendChild(newBtn);
        }
    }
}

clearBtn.addEventListener("click", function() {

    // Prevents the page from being reloaded
    event.preventDefault();
    arr = null;
    localStorage.setItem("list", arr);
    render();
    
})

submitBtn.addEventListener("click", function(event) {

    // Prevents the page from being reloaded
    event.preventDefault();

    // Checks to see if userInput is empty. If empty, does not continue.
    if (userInput.value === "") {
        return
    }

    if (arr != null) {
        arr.push(userInput.value);
    }
    else {
        arr = [userInput.value];
    }
    localStorage.setItem("list", JSON.stringify(arr));
    userInput.value = "";
    render();

});