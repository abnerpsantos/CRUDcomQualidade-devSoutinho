import todoRepository from "@ui/repository/todoRepository";

interface TodoControllerGetParams {
    page?: number;
}

async function get({ page }: TodoControllerGetParams = {}) {
    return todoRepository.get({ page: page || 1, limit: 5 });
}

export default {
    get,
};
