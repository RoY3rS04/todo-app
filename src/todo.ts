export default class Todo {
    id: string;

    constructor(
        public title: string,
        public description: string,
        public isDone: boolean
    ) {
        this.title = title;
        this.description = description;
        this.isDone = isDone;
        this.id = crypto.randomUUID();
    }
}

export function isTodoArray<T extends unknown[]>(arr: T) {
    const isTodoArray = arr.every((item) => {
        return isTodoElement(item);
    })

    return isTodoArray;
}

function isTodoElement(el: unknown): el is Todo {
    return (el as Todo).id !== undefined;
}

export class TodoActions {
    static todos: Todo[] = [];

    static addTodo(todo: Todo) {
        this.todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(this.todos));
        return todo;
    }

    static deleteTodo(id: string) {
        this.todos = this.todos.filter((todo: Todo) => {
            return todo.id !== id;
        });

        localStorage.setItem('todos', JSON.stringify(this.todos));

        return this.todos;
    }

    static updateTodo(id: string) {
        this.todos.forEach((todo) => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone;
            }
        })

        localStorage.setItem('todos', JSON.stringify(this.todos));

        console.log(this.todos);

        return this.todos;
    }

    static toString() {
        return JSON.stringify(this.todos);
    }
}