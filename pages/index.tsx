import todoController from "@ui/controller/todoController";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { useEffect, useRef, useState } from "react";

interface Todo {
    id: string;
    content: string;
    date: string;
    done: boolean;
}

const bg = "https://mariosouto.com/cursos/crudcomqualidade/bg";

export default function Page() {
    const [todoList, setTodoList] = useState<Array<Todo>>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [newTodoInput, setNewTodoInput] = useState("");
    const totalTodos = useRef(0);
    const filteredTodos = todoController.filterTodo(search, todoList);

    useEffect(() => {
        (async function () {
            setLoading(true);
            const { todoList, totalOfTodos } = await todoController.get({
                page: page,
                limit: 5,
            });
            totalTodos.current = totalOfTodos;
            setTodoList(todoList);
            setLoading(false);
        })();
    }, [page]);

    return (
        <main>
            <GlobalStyles />
            <header
                style={{
                    background: `url(${bg})`,
                    backgroundSize: "cover",
                }}
            >
                <div className="typewriter">
                    <h1>O que fazer hoje?</h1>
                </div>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await todoController.create({ content: newTodoInput });
                        setNewTodoInput("");
                        setPage(1);
                    }}
                >
                    <input
                        type="text"
                        placeholder="Correr, Estudar..."
                        value={newTodoInput}
                        onChange={(e) => setNewTodoInput(e.target.value)}
                    />
                    <button
                        style={{
                            padding: "4px",
                        }}
                        type="submit"
                        aria-label="Adicionar novo item"
                    >
                        +
                    </button>
                </form>
            </header>

            <section>
                <form>
                    <input
                        type="text"
                        placeholder="Filtrar lista atual, ex: Dentista"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>

                <table border={1}>
                    <thead>
                        <tr>
                            <th align="left">
                                <input type="checkbox" disabled />
                            </th>
                            <th align="left">Id</th>
                            <th align="left">Conteúdo</th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTodos.length ? (
                            filteredTodos.map((todo) => {
                                return (
                                    <tr key={todo.id}>
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>{todo.id.substring(0, 4)}</td>
                                        <td>{todo.content}</td>
                                        <td align="right">
                                            <button data-type="delete">
                                                Apagar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} align="center">
                                    Nenhum item encontrado
                                </td>
                            </tr>
                        )}
                        {loading && (
                            <tr>
                                <td
                                    colSpan={4}
                                    align="center"
                                    style={{ textAlign: "center" }}
                                >
                                    Carregando...
                                </td>
                            </tr>
                        )}

                        <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                <button
                                    data-type="load-more"
                                    disabled={totalTodos.current < 5}
                                    onClick={() =>
                                        setPage(
                                            (currentValue) => currentValue + 1
                                        )
                                    }
                                >
                                    Página {page}, Carregar mais{" "}
                                    <span
                                        style={{
                                            display: "inline-block",
                                            marginLeft: "4px",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        ↓
                                    </span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
}
