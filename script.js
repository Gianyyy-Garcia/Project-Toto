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

function saveData() { // KELLY //
    const tasks = [];
    const items = listContainer.getElementsByTagName("li");
    for (let item of items) {
        tasks.push(item.innerHTML);
    }
    localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem("data"));
    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task;
            listContainer.appendChild(li);
        });
    }
}

function clearAllTasks() {
    listContainer.innerHTML = '';
    saveData();
}

showTask(); // KELLY //
