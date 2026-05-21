import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState(false);
  const [inUse, setInUse] = useState(false);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState('');
  // const [allTodo, setAllTodo] = useState(false);
  const [completedTodo, setCompletedTodo] = useState(false);
  const [todoModalUse, setTodoModalUse] = useState(false);
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setActiveTodo={setActiveTodo}
                setCompletedTodo={setCompletedTodo}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              {!loader && (
                <TodoList
                  setTodoModalUse={setTodoModalUse}
                  todoModalUse={todoModalUse}
                  setTodos={setTodos}
                  todos={(() => {
                    const base = activeTodo
                      ? activeTodos
                      : completedTodo
                        ? completedTodos
                        : todos;
                    const q = query.trim().toLowerCase();

                    return q
                      ? base.filter(t => t.title.toLowerCase().includes(q))
                      : base;
                  })()}
                  inUse={inUse}
                  setInUse={setInUse}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        setTodoModalUse={setTodoModalUse}
        setInUse={setInUse}
        inUse={inUse}
      />
    </>
  );
};
