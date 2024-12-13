// References to DOM elementsgit
const inputBox = document.getElementById("input-box"); // GIAN //
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskText = inputBox.value.trim(); // Trim whitespace for cleaner input
    const prioritySelector = document.getElementById("priority-selector");

    if (!taskText) {
        alert("You must write something!");
        return;
    }

    // Create a new task element
    const taskItem = document.createElement("li");
    if (prioritySelector) {
        taskItem.classList.add(prioritySelector.value); // Add class based on priority
    }

    // Get the current date and time
    const currentTime = new Date();
    const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;

    // Set task content with text and timestamp
    taskItem.innerHTML = `${taskText} <span class="task-time">(${formattedTime})</span>`;

    // Create a close button
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "\u00d7"; // Unicode for '×'
    taskItem.appendChild(closeButton);

    // Append the task to the list container
    listContainer.appendChild(taskItem);

    // Clear the input field
    inputBox.value = "";

    // Save the updated task list
    saveData();
}

listContainer.addEventListener("click", (event) => {
    const target = event.target;

    if (target.tagName === "LI") {
        target.classList.toggle("checked"); // Toggle 'checked' class
        saveData();
    } else if (target.tagName === "SPAN") {
        target.parentElement.remove(); // Remove the task
        saveData();
    }
}, false); // GIAN //

// KELLY //
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
