const inputBox = document.getElementById("input-box");
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
}, false);

function saveData() {
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

showTask();
