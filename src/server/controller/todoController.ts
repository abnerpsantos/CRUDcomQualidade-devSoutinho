import { readTodo } from "core/db";
import { NextApiRequest, NextApiResponse } from "next";

function get(req: NextApiRequest, res: NextApiResponse) {
    const { page, limit } = parseQuery(req.query);
    const todoList = readTodo({ page, limit });
    return res.status(200).json(todoList);
}

function parseQuery(query: unknown) {
    if (query === null || query === undefined || typeof query !== "object") {
        throw new Error("Invalid query!");
    }
    const queryObj = {
        page: 1,
        limit: 5,
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
    get,
};
