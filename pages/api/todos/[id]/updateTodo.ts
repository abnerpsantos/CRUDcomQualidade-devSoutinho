import todoController from "@server/controller/todoController";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    return todoController.updateTodo(request, response);
}
