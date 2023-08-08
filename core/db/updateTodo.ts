import readTodo from "./readTodo";
import { writeFileSync } from "fs";
import { Todo, UUID } from "core/types/todo-types";
import { DB_FILE_PATH } from "core/utils/constants";

export default function updateTodo(id: UUID): Todo {
    const { todoList } = readTodo();
    const indexOfTodoToUpdate = todoList.findIndex((todo) => todo.id === id);
    const todoToUpdate = todoList[indexOfTodoToUpdate];
    const updatedTodo = {
        ...todoToUpdate,
        date: new Date().toISOString(),
        done: !todoToUpdate.done,
    };

    todoList[indexOfTodoToUpdate] = updatedTodo;
    writeFileSync(DB_FILE_PATH, JSON.stringify({ todoList }, null, 2));

    return updatedTodo;
}
