import todoRepository from "@ui/repository/todoRepository";
import { validate } from "uuid";
interface Todo {
    id: string;
    content: string;
    date: string;
    done: boolean;
}

interface TodoControllerGetParams {
    page?: number;
    limit?: number;
}

interface TodoControllerCreateParams {
    content: string;
}

interface TodoControllerDeleteParams {
    id: string;
}

async function get({ page, limit }: TodoControllerGetParams = {}) {
    return todoRepository.get({ page: page || 1, limit: limit });
}

function filterTodo(searchParam: string, todoList: Todo[]) {
    return todoList.filter((todo) => {
        const regex = new RegExp(searchParam, "gi");
        return regex.test(todo.content);
    });
}

function create({ content }: TodoControllerCreateParams) {
    return todoRepository.create({ content });
}

function deleteTodo({ id }: TodoControllerDeleteParams) {
    if (typeof id !== "string") {
        throw new Error("Id must be an UUID string");
    }
    if (!validate(id)) {
        throw new Error("Id must be a valid UUID");
    }
    return todoRepository.deleteTodo({ id });
}
export default {
    get,
    filterTodo,
    create,
};
