const API_URL = "http://localhost:8085/tasks";

// Fetch tasks
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const tasks = await response.json();
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.name;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// Add new task
document.getElementById("taskForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const newTask = { name: taskInput.value };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });

        if (!response.ok) throw new Error("Failed to add task");

        taskInput.value = "";
        fetchTasks();
    } catch (error) {
        console.error("Error adding task:", error);
    }
});

// Load tasks when page starts
fetchTasks();
