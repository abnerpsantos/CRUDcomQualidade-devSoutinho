import todoController from "@ui/controller/todoController";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { useEffect, useRef, useState } from "react";

interface Todo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}

const bg = "https://mariosouto.com/cursos/crudcomqualidade/bg";

export default function Page() {
    const [todoList, setTodoList] = useState<Array<Todo>>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const totalTodos = useRef(0);

    useEffect(() => {
        (async function () {
            setTodoList([]);
            setLoading(true);
            const { todoList, totalOfTodos } = await todoController.get({
                page: page,
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
                }}
            >
                <div className="typewriter">
                    <h1>O que fazer hoje?</h1>
                </div>
                <form>
                    <input type="text" placeholder="Correr, Estudar..." />
                    <button type="submit" aria-label="Adicionar novo item">
                        +
                    </button>
                </form>
            </header>

            <section>
                <form>
                    <input
                        type="text"
                        placeholder="Filtrar lista atual, ex: Dentista"
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
                        {todoList.length ? (
                            todoList.map((todo) => {
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
