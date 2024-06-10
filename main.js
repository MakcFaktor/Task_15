document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.js--form');
    const input = document.querySelector('.js--form__input');
    const todosWrapper = document.querySelector('.js--todos-wrapper');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Function to save todos to localStorage
    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Function to render todos
    const renderTodos = () => {
        todosWrapper.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item${todo.completed ? ' todo-item--checked' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
                <span class="todo-item__description">${todo.text}</span>
                <button class="todo-item__delete" onclick="deleteTask(${index})">Видалити</button>
            `;
            todosWrapper.appendChild(li);
        });
    };

    // Function to add a new task
    const addTask = (text) => {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
    };

    // Function to toggle task completion
    window.toggleComplete = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    // Function to delete a task
    window.deleteTask = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            addTask(text);
            input.value = '';
        }
    });

    // Initial render
    renderTodos();
});
