async function get() {
    const data = await fetch("/api/todos");
    const { todoList } = await data.json();
    return todoList;
}

export default {
    get,
};
