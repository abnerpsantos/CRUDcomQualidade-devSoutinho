import { createTodo, readTodo } from "core/db";

interface getTodoListParams {
    page: number;
    limit?: number;
}

interface createTodoParams {
    content: string;
}

async function get({ page, limit }: getTodoListParams) {
    const { todoList } = readTodo();
    if (!limit) {
        return {
            todoList,
        };
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTodos = todoList.slice(startIndex, endIndex);
    return {
        todoList: paginatedTodos,
    };
}

async function create({ content }: createTodoParams) {
    const todo = createTodo(content);
    return todo;
}

export default {
    get,
    create,
};
