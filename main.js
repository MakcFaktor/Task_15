document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.js--form');
    const input = document.querySelector('.js--form__input');
    const todosWrapper = document.querySelector('.js--todos-wrapper');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

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

    const addTask = (text) => {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
    };

    window.toggleComplete = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    window.deleteTask = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            addTask(text);
            input.value = '';
        }
    });

    renderTodos();
});
