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
    const { todoList }: { todoList: Array<Todo> } = await data.json();
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

export default {
    get,
};
