const API_URL = "https://6818a3855a4b07b9d1d01f91.mockapi.io/Tareas"

// Obtener todas las tareas (GET)
async function obtenerTareas() {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    const tareas = await response.json()
    return tareas
  } catch (error) {
    console.error("Error al obtener tareas:", error)
    throw error
  }
}

// Crear una nueva tarea (POST)
async function crearTarea(task, status) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, status }),
      })
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      const nuevaTarea = await response.json()
      return nuevaTarea
    } catch (error) {
      console.error("Error al crear tarea:", error)
      throw error
    }
  }
  
// Actualizar una tarea existente (PUT)
async function actualizarTarea(id, task, status) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, status }),
    })
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    const tareaActualizada = await response.json()
    return tareaActualizada
  } catch (error) {
    console.error("Error al actualizar tarea:", error)
    throw error
  }
}

// Eliminar una tarea (DELETE)
async function eliminarTarea(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    const tareaEliminada = await response.json()
    return tareaEliminada
  } catch (error) {
    console.error("Error al eliminar tarea:", error)
    throw error
  }
}

// Renderizar tareas en el DOM
function renderizarTareas(tareas) {
  const contenedor = document.querySelector(".body-task__view")
  contenedor.innerHTML = ""

  tareas.forEach((tarea) => {
    const div = document.createElement("div")
    div.className = "tarea-item"
    div.innerHTML = `
      <span><strong>${tarea.task}</strong> - ${tarea.status}</span>
      <button onclick="editarTarea('${tarea.id}', '${tarea.task}', '${tarea.status}')">Editar</button>
      <button onclick="borrarTarea('${tarea.id}')">Eliminar</button>
    `
    contenedor.appendChild(div)
  })
}

// Cargar tareas al iniciar
async function cargarTareas() {
  const tareas = await obtenerTareas()
  renderizarTareas(tareas)
}

// Variable para saber si estamos editando
let tareaEditandoId = null

// Agregar o actualizar tarea
async function agregarOActualizarTarea() {
  const inputTask = document.getElementById("taskInput")
  const inputStatus = document.getElementById("statusSelect")

  const task = inputTask.value.trim()
  const status = inputStatus.value

  if (!task) {
    alert("Por favor ingresa el nombre de la tarea")
    return
  }

  if (tareaEditandoId) {
    await actualizarTarea(tareaEditandoId, task, status)
    tareaEditandoId = null
    document.getElementById("addTaskBtn").textContent = "Agregar"
  } else {
    await crearTarea(task, status)
  }

  inputTask.value = ""
  inputStatus.value = "Por Iniciar"
  await cargarTareas()
}

// Preparar edición de tarea
function editarTarea(id, task, status) {
  tareaEditandoId = id
  document.getElementById("taskInput").value = task
  document.getElementById("statusSelect").value = status
  document.getElementById("addTaskBtn").textContent = "Actualizar"
}

// Eliminar tarea
async function borrarTarea(id) {
  if (confirm("¿Estás seguro de eliminar esta tarea?")) {
    await eliminarTarea(id)
    await cargarTareas()
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  cargarTareas()

  const btnAgregar = document.getElementById("addTaskBtn")
  btnAgregar.addEventListener("click", agregarOActualizarTarea)
})
