const API_URL = "https://6818a3855a4b07b9d1d01f91.mockapi.io/Tareas";

const taskInput = document.getElementById("taskInput");
const statusSelect = document.getElementById("statusSelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskView = document.querySelector(".body-task__view");

// ============================
//      CARGAR TAREAS (GET)
// ============================
async function loadTasks() {
    try {
        const res = await fetch(API_URL);
        const tasks = await res.json();

        taskView.innerHTML = tasks.map(t => `
            <div class="task-item">
                <span class="task-text">${t.task}</span>
                <span class="task-status status-${t.status.replace(" ", "\\ ")}">${t.status}</span>
                <button class="task-btn delete" data-id="${t.id}">Eliminar</button>
            </div>
        `).join("");

        // Activar botones de eliminar
        document.querySelectorAll(".delete").forEach(btn => {
            btn.addEventListener("click", () => deleteTask(btn.dataset.id));
        });

    } catch (err) {
        console.error("Error cargando tareas:", err);
    }
}

// ============================
//      AGREGAR TAREA (POST)
// ============================
async function addTask() {
    const task = taskInput.value.trim();
    const status = statusSelect.value;

    if (!task) return;

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task, status })
        });

        taskInput.value = "";
        loadTasks(); // refrescar

    } catch (err) {
        console.error("Error agregando tarea:", err);
    }
}

// ============================
//      ELIMINAR TAREA (DELETE)
// ============================
async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        loadTasks();

    } catch (err) {
        console.error("Error eliminando tarea:", err);
    }
}

// ============================
//      EVENTOS
// ============================
addTaskBtn.addEventListener("click", addTask);

// Cargar al inicio
loadTasks();
