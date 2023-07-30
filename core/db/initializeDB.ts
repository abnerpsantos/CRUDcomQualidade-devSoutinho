import { readdirSync, writeFileSync } from "fs";

export default function initializeDB() {
    const dir = readdirSync("./core/data");
    if (!dir.includes("todoList.json")) {
        writeFileSync(
            "./core/data/todoList.json",
            JSON.stringify({ todoList: [] }, null, 2)
        );
    }
    return "DB initialized!";
}
