export default class Todo {
    title;
    description;
    isDone;
    id;
    constructor(title, description, isDone) {
        this.title = title;
        this.description = description;
        this.isDone = isDone;
        this.title = title;
        this.description = description;
        this.isDone = isDone;
        this.id = crypto.randomUUID();
    }
}
export function isTodoArray(arr) {
    const isTodoArray = arr.every((item) => {
        return isTodoElement(item);
    });
    return isTodoArray;
}
function isTodoElement(el) {
    return el.id !== undefined;
}
export class TodoActions {
    static todos = [];
    static addTodo(todo) {
        this.todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(this.todos));
        return todo;
    }
    static deleteTodo(id) {
        this.todos = this.todos.filter((todo) => {
            return todo.id !== id;
        });
        localStorage.setItem('todos', JSON.stringify(this.todos));
        return this.todos;
    }
    static updateTodo(id) {
        this.todos.forEach((todo) => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone;
            }
        });
        localStorage.setItem('todos', JSON.stringify(this.todos));
        console.log(this.todos);
        return this.todos;
    }
    static toString() {
        return JSON.stringify(this.todos);
    }
}
