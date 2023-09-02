import Todo, { TodoActions, isTodoArray } from "./todo.js";
const addBtn = document.querySelector('#addButton');
const todoList = document.querySelector('#todoList');
let deleteBtns = document.querySelectorAll('.deleteTodo');
let checkTodos = document.querySelectorAll('.checkTodo');
const myTodos = JSON.parse(localStorage.getItem('todos') ?? TodoActions.toString());
if (Array.isArray(myTodos) && isTodoArray(myTodos)) {
    TodoActions.todos = myTodos;
    loadDOM();
}
if (addBtn instanceof HTMLFormElement) {
    addBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoInfo = new FormData(e.target);
        const todo = new Todo(todoInfo.get('title'), todoInfo.get('description'), false);
        TodoActions.addTodo(todo);
        loadDOM();
    });
}
function loadDOM() {
    if (todoList) {
        todoList.innerHTML = `<div class="todoScroll mt-5 overflow-y-scroll max-h-[300px]">
            <h1 class="text-2xl font-semibold">My Todos</h1>
            ${TodoActions.todos.map((todo) => {
            return `<div class="mt-2">
                    <h2 class="text-xl font-medium">${todo.title}</h2>
                    <div class="flex items-center justify-between px-3 py-2 rounded bg-gray-200 relative mt-1">
                        <p class="text-sm">${todo.description}</p>
                        <form class="deleteTodo absolute right-0 top-0 h-full flex items-center gap-x-4">
                            <input class="checkTodo h-full" value="${todo.id}" ${todo.isDone ? 'checked' : null} type="checkbox"></input>
                            <input hidden name="id" value="${todo.id}"></input>
                            <button type="submit" class="px-3 h-full rounded bg-red-500 text-white flex items-center justify-center">${trashIcon()} </button>
                        </form>
                    </div>
                </div>`;
        }).join('')}
            </div>`;
    }
    deleteBtns = document.querySelectorAll('.deleteTodo');
    checkTodos = document.querySelectorAll('.checkTodo');
    loadEvents();
}
function loadEvents() {
    if (deleteBtns) {
        deleteBtns.forEach((btn) => {
            if (btn instanceof HTMLFormElement) {
                btn.addEventListener('submit', (e) => {
                    e.preventDefault();
                    console.log(e);
                    const data = new FormData(e.target);
                    TodoActions.deleteTodo(data.get('id'));
                    loadDOM();
                });
            }
        });
    }
    if (checkTodos) {
        checkTodos.forEach((check) => {
            if (check instanceof HTMLInputElement) {
                check.addEventListener('change', (e) => {
                    TodoActions.updateTodo(e.target.value);
                });
            }
        });
    }
}
function trashIcon(color = 'currentColor') {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" fill="${color}"/>
    </svg>
    `;
}