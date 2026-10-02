/*HTML elements*/

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

/*Load Tasks*/

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/*Display Tasks*/
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {

            taskText.style.textDecoration = "line-through";
            taskText.style.color = "#777777";
        }

        taskText.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();
    });

/*Button Container*/

const buttonContainer = document.createElement("div");

buttonContainer.style.display = "flex";
buttonContainer.style.gap = "8px";

const editButton = document.createElement("button");

editButton.textContent = "Edit"; 

editButton.style.backgroundColor - "Transparent"; 
editButton.style.color = "#ffffff";
editButton.style.border = "1px solid #444444";
editButton.style.borderRadius = "6px";
editButton.style.padding = "6px 10px";
editButton.style.cursor = "pointer";

editButton.addEventListener("click", function() {

    const newTask = prompt("Edit your task:", task.text);

    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();

        saveTasks(); 
        displayTasks();
    }
});

/*Delete Button*/

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";

deleteButton.style.backgroundColor = "#ffffff";
deleteButton.style.color = "#000000";
deleteButton.style.border = "none";
deleteButton.style.borderRadius = "6px";
deleteButton.style.padding = "6px 10px";
deleteButton.style.cursor = "pointer";

deleteButton.addEventListener("click" , function () {

    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
});

/*additional buttons for button container*/

buttonContainer.appendChild(editButton);
buttonContainer.appendChild(deleteButton); 

/*Add Task and buttons for list items*/

li.appendChild(taskText);
li.appendChild(buttonContainer);

taskList.appendChild(li);
    });
}

/*Create New Task*/

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    taskInput.value = "";
    displayTasks();
}

/*save tasks*/

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/*Event Listeners*/

addTaskButton.addEventListener("click", addTask);

/*Enter key event listener*/

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

/*display tasks on page load*/

displayTasks();
