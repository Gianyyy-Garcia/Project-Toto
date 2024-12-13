const inputBox = document.getElementById("input-box"); // GIAN //
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        let priority = document.getElementById("priority-selector").value;
        li.classList.add(priority); // Add class based on priority

        // Get current date and time
        const date = new Date();
        const timeCreated = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        // Add task text and date/time created
        li.innerHTML = `${inputBox.value} <span class="task-time">(${timeCreated})</span>`;

        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Close button
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false); // GIAN //

// Function to save tasks to local storage
function saveData() {
    // Collect all tasks from the list container
    const tasks = [];
    const items = listContainer.getElementsByTagName("li");

    for (const item of items) {
        tasks.push(item.textContent.trim()); // Use textContent for plain text
    }

    // Save the tasks array to local storage as a JSON string
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage and display them
function showTasks() {
    // Retrieve tasks from local storage and parse them
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Clear the current list to avoid duplication
    listContainer.innerHTML = '';

    // Create list items for each task and append them to the container
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task; // Use textContent to avoid injecting HTML
        listContainer.appendChild(li);
    });
}

// Function to clear all tasks from the list and local storage
function clearAllTasks() {
    // Clear the list container in the DOM
    listContainer.innerHTML = '';

    // Update local storage to remove all tasks
    saveData();
}

// Initialize the task list by showing saved tasks
showTasks(); //KELLY//
