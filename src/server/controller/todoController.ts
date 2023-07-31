import { readTodo } from "core/db";
import { NextApiRequest, NextApiResponse } from "next";

function get(req: NextApiRequest, res: NextApiResponse) {
    const todoList = readTodo();

    return res.status(200).json(todoList);
}

export default {
    get,
};
