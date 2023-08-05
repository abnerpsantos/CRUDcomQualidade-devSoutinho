import todoRepository from "@server/repository/todoRepository";
import { NextApiRequest, NextApiResponse } from "next";

interface QueryObj {
    page: number;
    limit?: number;
}

function get(req: NextApiRequest, res: NextApiResponse) {
    const { page, limit } = parseQuery(req.query);
    const todoList = todoRepository.getTodoList({ page, limit });
    return res.status(200).json(todoList);
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
    get,
};
