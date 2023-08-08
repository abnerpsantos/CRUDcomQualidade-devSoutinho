import { z } from "zod";

interface TodoRepositoryGetParams {
    page: number;
    limit?: number;
}

interface TodoRepositoryCreateParams {
    content: string;
}
interface TodoRepositoryGetOutput {
    todoList: Array<Todo>;
    totalOfTodos: number;
}

interface TodoRepositoryDeleteParams {
    id: string;
}

type Todo = z.infer<typeof todoSchema>;

const todoSchema = z.object({
    id: z.string().uuid(),
    content: z.string(),
    date: z.string().datetime(),
    done: z.boolean(),
});

const fileSchema = z.object({
    todoList: z.array(todoSchema),
    totalOfTodos: z.number(),
});

async function get({
    page,
    limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
    let fetchUrl = `/api/todos?page=${page}`;
    if (limit !== undefined) {
        fetchUrl = `/api/todos?page=${page}&limit=${limit}`;
    }
    const data = await fetch(fetchUrl);
    const jsonData = await data.json();
    const body = fileSchema.safeParse(jsonData);
    if (!body.success) {
        throw new Error(body.error.message);
    }
    const { todoList, totalOfTodos } = body.data;

    return {
        todoList,
        totalOfTodos,
    };
}

async function create({ content }: TodoRepositoryCreateParams) {
    fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ content }),
    });
}

async function deleteTodo({ id }: TodoRepositoryDeleteParams) {
    fetch(`/api/todos/${id}/deleteTodo`);
}

export default {
    get,
    create,
    deleteTodo,
};
