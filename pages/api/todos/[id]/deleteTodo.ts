import todoController from "@server/controller/todoController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    return todoController.deleteTodo(request, response);
}
