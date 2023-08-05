import { readTodo } from "core/db";

interface getTodoListParams {
    page: number;
    limit?: number;
}

function getTodoList({ page, limit }: getTodoListParams) {
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

export default {
    getTodoList,
};
