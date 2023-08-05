import todoRepository from "@ui/repository/todoRepository";

interface Todo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}
interface TodoControllerGetParams {
    page?: number;
    limit?: number;
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
export default {
    get,
    filterTodo,
};
