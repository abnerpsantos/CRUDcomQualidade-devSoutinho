import { NextApiRequest, NextApiResponse } from "next";
import todoRepository from "@server/repository/todoRepository";
import { z } from "zod";

const querySchema = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number().optional(),
});

const bodySchema = z.object({
    content: z.string(),
});

async function getTodos(req: NextApiRequest, res: NextApiResponse) {
    const query = querySchema.safeParse(req.query);
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
    const body = bodySchema.safeParse(JSON.parse(req.body));
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

export default {
    getTodos,
    createTodo,
};
