document.addEventListener("DOMContentLoaded", function () {
    const taskNameInput = document.getElementById("task-name");
    const taskStartInput = document.getElementById("task-start");
    const taskEndInput = document.getElementById("task-end");
    const taskColorInput = document.getElementById("task-color");
    const addTaskButton = document.getElementById("add-task");
    const ganttTasks = document.getElementById("gantt-tasks");
    const ganttHeader = document.getElementById("gantt-header");
    const modal = document.getElementById("modal");
    const closeModalButton = document.getElementById("close-modal");
    const saveTaskButton = document.getElementById("save-task");
    const deleteTaskButton = document.getElementById("delete-task");

    let currentTask = null;
    let selectedYear = 2025;
    let selectedMonth = 0;

    // Function to generate days of the selected month
    function generateDaysForMonth(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month
        ganttHeader.innerHTML = ""; // Clear the header

        // Create a column for each day
        for (let day = 1; day <= daysInMonth; day++) {
            const dayColumn = document.createElement("div");
            dayColumn.classList.add("gantt-column");
            dayColumn.textContent = day;
            ganttHeader.appendChild(dayColumn);
        }

        // Highlight the current day
        const currentDate = new Date();
        if (currentDate.getFullYear() === year && currentDate.getMonth() === month) {
            const currentDayColumn = ganttHeader.children[currentDate.getDate() - 1];
            if (currentDayColumn) {
                currentDayColumn.style.backgroundColor = "#4CAF50";
                currentDayColumn.style.color = "#fff";
            }
        }
    }

    // Calculate task position based on the day of the month
    function calculateTaskPosition(taskStart) {
        const firstDayOfMonth = new Date(taskStart.getFullYear(), taskStart.getMonth(), 1);
        const diffInDays = Math.floor((taskStart - firstDayOfMonth) / (1000 * 60 * 60 * 24));
        return diffInDays * 40; // Each day has a width of 40px
    }

    // Calculate task width based on the duration in days
    function calculateTaskWidth(taskStart, taskEnd) {
        const diffInDays = (taskEnd - taskStart) / (1000 * 60 * 60 * 24);
        return diffInDays * 40; // Each day has a width of 40px
    }

    // Add task to the Gantt chart
    function addTask() {
        const taskName = taskNameInput.value.trim();
        const taskStart = new Date(taskStartInput.value);
        const taskEnd = new Date(taskEndInput.value);
        const taskColor = taskColorInput.value;

        if (!taskName || isNaN(taskStart.getTime()) || isNaN(taskEnd.getTime()) || taskEnd <= taskStart) {
            alert("Please fill in all the fields correctly, especially the dates.");
            return;
        }

        // Create a task object
        const task = {
            name: taskName,
            start: taskStart,
            end: taskEnd,
            color: taskColor
        };

        // Create a DOM element for the task
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.style.backgroundColor = taskColor;
        taskDiv.style.left = `${calculateTaskPosition(taskStart)}px`; // Position based on the start day of the month
        taskDiv.style.width = `${calculateTaskWidth(taskStart, taskEnd)}px`; // Width based on the duration of the task

        // Add the task name
        const taskNameSpan = document.createElement("span");
        taskNameSpan.classList.add("task-name");
        taskNameSpan.textContent = taskName;
        taskDiv.appendChild(taskNameSpan);

        // Add an event listener for task modification
        taskDiv.addEventListener("click", function () {
            currentTask = task;
            document.getElementById("edit-name").value = task.name;
            document.getElementById("edit-start").value = taskStartInput.value;
            document.getElementById("edit-end").value = taskEndInput.value;
            document.getElementById("edit-color").value = task.color;

            modal.style.display = "flex";
        });

        // Add the task to the Gantt chart with a fade-in animation
        ganttTasks.appendChild(taskDiv);
        taskDiv.style.animation = "fadeIn 0.5s ease";

        // Reset the task form
        taskNameInput.value = "";
        taskStartInput.value = "";
        taskEndInput.value = "";
        taskColorInput.value = "#000000";
    }

    // Update the month and show the days
    document.getElementById("update-month").addEventListener("click", function () {
        selectedYear = document.getElementById("year").value;
        selectedMonth = document.getElementById("month").value;

        generateDaysForMonth(selectedYear, selectedMonth);
    });

    // Save task changes
    saveTaskButton.addEventListener("click", function () {
        if (!currentTask) return;

        const newName = document.getElementById("edit-name").value;
        const newStart = new Date(document.getElementById("edit-start").value);
        const newEnd = new Date(document.getElementById("edit-end").value);
        const newColor = document.getElementById("edit-color").value;

        currentTask.name = newName;
        currentTask.start = newStart;
        currentTask.end = newEnd;
        currentTask.color = newColor;

        // Update the task display
        const updatedTaskDiv = Array.from(ganttTasks.children).find(taskDiv => {
            return taskDiv.querySelector(".task-name").textContent === currentTask.name;
        });

        updatedTaskDiv.style.backgroundColor = currentTask.color;
        updatedTaskDiv.style.width = `${calculateTaskWidth(currentTask.start, currentTask.end)}px`;
        updatedTaskDiv.style.left = `${calculateTaskPosition(currentTask.start)}px`;
        updatedTaskDiv.querySelector(".task-name").textContent = currentTask.name;

        // Close the modal
        modal.style.display = "none";
    });

    // Delete a task
    deleteTaskButton.addEventListener("click", function () {
        if (!currentTask) return;

        // Remove the task from the Gantt chart
        const taskDivToRemove = Array.from(ganttTasks.children).find(taskDiv => {
            return taskDiv.querySelector(".task-name").textContent === currentTask.name;
        });
        if (taskDivToRemove) ganttTasks.removeChild(taskDivToRemove);

        // Close the modal
        modal.style.display = "none";
    });

    // Close modal without saving
    closeModalButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Add task
    addTaskButton.addEventListener("click", addTask);

    // Initialize for January 2025
    generateDaysForMonth(2025, 0); // January (0 = January)
});
