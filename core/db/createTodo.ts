import readTodo from "./readTodo";
import { writeFileSync } from "fs";
import { v4 as UUID } from "uuid";
import { Todo } from "core/types/todo-types";
import { DB_FILE_PATH } from "core/utils/constants";

export default function createTodo(content: string): Todo {
    const todo = {
        id: UUID(),
        date: new Date().toISOString(),
        content,
        done: false,
    };
    const { todoList } = readTodo();
    const newTodoList = {
        todoList: [...todoList, todo],
    };
    writeFileSync(DB_FILE_PATH, JSON.stringify(newTodoList, null, 2));
    return todo;
}
