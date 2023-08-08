import { createTodo, deleteTodo, readTodo, updateTodo } from "core/db";
import { UUID } from "core/types/todo-types";

interface getTodoListParams {
    page: number;
    limit?: number;
}

interface createTodoParams {
    content: string;
}

interface deleteTodoParams {
    id: UUID;
}

interface updateTodoParams {
    id: UUID;
}

async function get({ page, limit }: getTodoListParams) {
    const { todoList } = readTodo();
    const totalOfTodos = todoList.length;
    if (!limit) {
        return {
            totalOfTodos,
            todoList,
        };
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTodos = todoList.slice(startIndex, endIndex);
    return {
        totalOfTodos,
        todoList: paginatedTodos,
    };
}

async function create({ content }: createTodoParams) {
    const todo = createTodo(content);
    return todo;
}

async function deleteTodoById({ id }: deleteTodoParams) {
    deleteTodo(id);
    return "success";
}

async function updateTodoById({ id }: updateTodoParams) {
    updateTodo(id);
    return "success";
}

export default {
    get,
    create,
    deleteTodoById,
    updateTodoById,
};
