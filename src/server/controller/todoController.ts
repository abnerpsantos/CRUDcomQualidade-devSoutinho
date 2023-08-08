import { NextApiRequest, NextApiResponse } from "next";
import todoRepository from "@server/repository/todoRepository";
import { z } from "zod";

const getTodoQuerySchema = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number().optional(),
});

const createTodoBodySchema = z.object({
    content: z.string(),
});

const deleteTodoQuerySchema = z.object({
    id: z.string().uuid(),
});

const updateTodoQuerySchema = z.object({
    id: z.string().uuid(),
});
async function getTodos(req: NextApiRequest, res: NextApiResponse) {
    const query = getTodoQuerySchema.safeParse(req.query);
    if (!query.success) {
        return res.status(400).json({
            error: {
                message: "Invalid query",
            },
        });
    }
    const { page, limit } = query.data;
    const { todoList, totalOfTodos } = await todoRepository.get({
        page,
        limit,
    });
    return res.status(200).json({ todoList, totalOfTodos });
}

async function createTodo(req: NextApiRequest, res: NextApiResponse) {
    const body = createTodoBodySchema.safeParse(JSON.parse(req.body));
    if (!body.success) {
        return res.status(400).json({
            error: {
                message: "Invalid body",
            },
        });
    }
    const { content } = body.data;
    const todo = await todoRepository.create({ content });
    return res.status(201).json(todo);
}

async function deleteTodo(req: NextApiRequest, res: NextApiResponse) {
    const query = deleteTodoQuerySchema.safeParse(req.query);
    if (!query.success) {
        throw new Error(query.error.message);
    }
    const { id } = query.data;
    const success = await todoRepository.deleteTodoById({ id });
    return res.status(200).json({
        message: success,
    });
}

async function updateTodo(req: NextApiRequest, res: NextApiResponse) {
    const query = updateTodoQuerySchema.safeParse(req.query);
    if (!query.success) {
        throw new Error(query.error.message);
    }
    const { id } = query.data;
    const success = todoRepository.updateTodoById({ id });
    return res.status(200).json({
        message: success,
    });
}

export default {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
};
