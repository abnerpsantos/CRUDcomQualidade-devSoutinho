import { NextApiRequest, NextApiResponse } from "next";
import todoController from "@server/controller/todoController";

type HttpResponsesType = {
    [key: string]: () => void;
};

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const HttpResponses: HttpResponsesType = {
        GET: () => todoController.getTodos(request, response),
        POST: () => todoController.createTodo(request, response),
    };
    if (request.method) {
        return HttpResponses[request.method]();
    }
}
