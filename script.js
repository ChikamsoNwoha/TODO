const taskInput = document.getElementById("taskInput");
    const taskCategory = document.getElementById("taskCategory");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const searchTask = document.getElementById("searchTask");
    const filterCategory = document.getElementById("filterCategory");
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    // Load saved tasks
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // THEME: Load saved theme
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      themeIcon.textContent = "🌞";
      themeText.textContent = "Light";
    }

    // Render tasks
    function renderTasks() {
      taskList.innerHTML = "";
      const searchVal = searchTask.value.toLowerCase();
      const filterVal = filterCategory.value;

      tasks
        .filter(t => t.text.toLowerCase().includes(searchVal))
        .filter(t => filterVal === "All" || t.category === filterVal)
        .forEach((task, i) => {
          const li = document.createElement("li");
          li.className = "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow";

          li.innerHTML = `
            <div>
              <span class="${task.done ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white'}">${task.text}</span>
              <span class="ml-2 text-xs px-2 py-1 rounded bg-purple-200 dark:bg-purple-500 text-purple-800 dark:text-white">${task.category}</span>
            </div>
            <div class="flex gap-2">
              <button onclick="toggleTask(${i})" class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">${task.done ? "Undo" : "Done"}</button>
              <button onclick="deleteTask(${i})" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
          `;
          taskList.appendChild(li);
        });

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add task
    addTaskBtn.addEventListener("click", () => {
      if (taskInput.value.trim() !== "") {
        tasks.push({ text: taskInput.value, category: taskCategory.value, done: false });
        taskInput.value = "";
        renderTasks();
      }
    });

    // Delete task
    function deleteTask(i) {
      tasks.splice(i, 1);
      renderTasks();
    }

    // Toggle done
    function toggleTask(i) {
      tasks[i].done = !tasks[i].done;
      renderTasks();
    }

    // Search & filter
    searchTask.addEventListener("input", renderTasks);
    filterCategory.addEventListener("change", renderTasks);

    // THEME toggle with icon + persistence
    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      if (isDark) {
        localStorage.setItem("theme", "dark");
        themeIcon.textContent = "🌞";
        themeText.textContent = "Light";
      } else {
        localStorage.setItem("theme", "light");
        themeIcon.textContent = "🌙";
        themeText.textContent = "Dark";
      }
    });

    renderTasks();