interface TodoRepositoryGetParams {
    page: number;
    limit: number;
}
interface TodoRepositoryGetOutput {
    todoList: Array<Todo>;
    totalOfTodos: number;
    pages: number;
}
interface Todo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}

async function get({
    page,
    limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
    const data = await fetch("/api/todos");
    const jsonData = await data.json();
    const { todoList } = parseTodo(jsonData);
    const totalOfTodos = todoList.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTodos = todoList.slice(startIndex, endIndex);

    return {
        todoList: paginatedTodos,
        totalOfTodos,
        pages: totalOfTodos / limit,
    };
}

function parseTodo(responseBody: unknown): { todoList: Array<Todo> } {
    if (
        responseBody !== null &&
        typeof responseBody === "object" &&
        "todoList" in responseBody &&
        Array.isArray(responseBody.todoList)
    ) {
        return {
            todoList: responseBody.todoList.map((todo) => {
                if (todo === null && typeof todo !== "object") {
                    throw new Error("Invalid todo from api");
                }
                const { id, content, date, done } = todo;
                return { id, content, date, done } as Todo;
            }),
        };
    }
    throw new Error("Invalid todo from api");
}

export default {
    get,
};
