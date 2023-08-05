import { NextApiRequest, NextApiResponse } from "next";
import todoRepository from "@server/repository/todoRepository";

interface QueryObj {
    page: number;
    limit?: number;
}

async function getTodos(req: NextApiRequest, res: NextApiResponse) {
    const { page, limit } = parseQuery(req.query);
    const todoList = await todoRepository.get({ page, limit });
    return res.status(200).json(todoList);
}

async function createTodo(req: NextApiRequest, res: NextApiResponse) {
    const { content } = parseBody(req.body);
    const todo = await todoRepository.create({ content });
    return res.status(201).json(todo);
}

function parseBody(body: unknown) {
    if (body === null || body === undefined || typeof body !== "object") {
        throw new Error("Invalid body!");
    }
    if ("content" in body && typeof body.content === "string") {
        return {
            content: body.content,
        };
    }
    throw new Error("Invalid body!");
}
function parseQuery(query: unknown) {
    if (query === null || query === undefined || typeof query !== "object") {
        throw new Error("Invalid query!");
    }
    const queryObj: QueryObj = {
        page: 1,
    };
    if (
        "limit" in query &&
        typeof query.limit === "string" &&
        !isNaN(Number(query.limit))
    ) {
        queryObj.limit = Number(query.limit);
    }
    if (
        "page" in query &&
        typeof query.page === "string" &&
        !isNaN(Number(query.page))
    ) {
        queryObj.page = Number(query.page);
    }
    return queryObj;
}

export default {
    getTodos,
    createTodo,
};
