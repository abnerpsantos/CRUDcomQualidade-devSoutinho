import todoRepository from "@ui/repository/todoRepository";

interface TodoControllerGetParams {
    page?: number;
    limit?: number;
}

async function get({ page, limit }: TodoControllerGetParams = {}) {
    return todoRepository.get({ page: page || 1, limit: limit });
}

export default {
    get,
};
