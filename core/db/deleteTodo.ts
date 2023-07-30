import readTodo from "./readTodo";
import { writeFileSync } from "fs";
import { UUID } from "core/types/todo-types";
import { DB_FILE_PATH } from "core/utils/constants";

export default function deleteTodo(id: UUID) {
    const { todoList } = readTodo();
    const newTodoList = todoList.filter((todo) => todo.id !== id);

    writeFileSync(
        DB_FILE_PATH,
        JSON.stringify({ todoList: newTodoList }, null, 2)
    );
}
