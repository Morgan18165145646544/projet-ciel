// Tableau pour stocker les tâches
let tasks = [];

// Fonction pour afficher une boîte de dialogue personnalisée (remplace alert())
function showCustomAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50';
    alertBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
        <p class="text-lg text-gray-800 mb-4">${message}</p>
        <button id="closeAlert" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">OK</button>
      </div>
    `;
    document.body.appendChild(alertBox);

    document.getElementById('closeAlert').onclick = () => {
      document.body.removeChild(alertBox);
    };
}

// Fonction pour rendre les tâches dans le DOM
function renderTasks() {
    const newTasksList = document.getElementById('newTasksList');
    newTasksList.innerHTML = ''; // Vide la liste actuelle avant de la reconstruire

    tasks.filter(task => task.status === 'Nouveau').forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'bg-[#3b3b6b] p-3 rounded-md text-white shadow-sm';
        taskElement.textContent = task.text;
        newTasksList.appendChild(taskElement);
    });
}

// Fonction pour ajouter une nouvelle tâche
function handleAddTask() {
    const newTaskInput = document.getElementById('newTaskInput');
    const newTaskText = newTaskInput.value.trim();

    if (newTaskText !== '') {
        const newTask = {
            id: Date.now(),
            text: newTaskText,
            status: 'Nouveau',
        };
        tasks.push(newTask); // Ajoute la nouvelle tâche au tableau
        newTaskInput.value = ''; // Réinitialise le champ de saisie
        renderTasks(); // Met à jour l'affichage des tâches
    } else {
        showCustomAlert("Veuillez entrer le texte de la tâche.");
    }
}

// Écouteurs d'événements une fois que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('addTaskButton');
    const newTaskInput = document.getElementById('newTaskInput');

    // Ajoute un écouteur d'événement au bouton "Nouvelle tâche"
    addTaskButton.addEventListener('click', handleAddTask);

    // Ajoute un écouteur d'événement pour la touche "Entrée" dans le champ de saisie
    newTaskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });

    // Rendre les tâches initiales (s'il y en avait)
    renderTasks();
});
