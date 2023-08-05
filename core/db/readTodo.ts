import { Todo } from "core/types/todo-types";
import { DB_FILE_PATH } from "core/utils/constants";
import { readFileSync } from "fs";

export default function readTodo(): {
    todoList: Array<Todo>;
} {
    const file = readFileSync(DB_FILE_PATH, "utf-8");
    const data = JSON.parse(file);
    const parsedData = parseData(data);
    return parsedData;
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
