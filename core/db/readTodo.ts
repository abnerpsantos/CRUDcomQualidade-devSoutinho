import { Todo } from "core/types/todo-types";
import { DB_FILE_PATH } from "core/utils/constants";
import { readFileSync } from "fs";

interface ReadTodoGetParams {
    page: number;
    limit: number;
}

export default function readTodo({ page, limit }: ReadTodoGetParams): {
    todoList: Array<Todo>;
} {
    const file = readFileSync(DB_FILE_PATH, "utf-8");
    const fileDataAsJSON = JSON.parse(file);
    const parsedData = parseData(fileDataAsJSON);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTodos = parsedData.todoList.slice(startIndex, endIndex);
    return {
        todoList: paginatedTodos,
    };
}

function parseData(data: unknown): {
    todoList: Array<Todo>;
} {
    if (
        data === null ||
        data === undefined ||
        typeof data !== "object" ||
        !("todoList" in data) ||
        !Array.isArray(data.todoList)
    ) {
        throw new Error("Invalid data!");
    }
    return {
        todoList: data.todoList.map((todo) => {
            if (
                todo === null ||
                todo === undefined ||
                typeof todo !== "object"
            ) {
                throw new Error("Invalid data!");
            }
            const { id, content, date, done } = todo;
            return { id, content, date, done } as Todo;
        }),
    };
}
