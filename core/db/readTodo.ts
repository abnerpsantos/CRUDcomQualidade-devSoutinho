import { Todo } from "core/types/todo-types";
import { DB_FILE_PATH } from "core/utils/constants";
import { readFileSync } from "fs";

export default function readTodo(): {
    todoList: Array<Todo>;
} {
    const data = readFileSync(DB_FILE_PATH, "utf-8");
    return JSON.parse(data);
}
