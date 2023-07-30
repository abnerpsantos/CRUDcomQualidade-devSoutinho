export interface Todo {
    id: UUID;
    content: string;
    date: string;
    done: boolean;
}

export type partialTodo = Omit<Partial<Todo>, "id" | "date">;

export type UUID = string;
