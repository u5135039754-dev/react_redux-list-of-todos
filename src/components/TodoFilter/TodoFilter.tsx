import React from 'react';

type Props = {
  setActiveTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setCompletedTodo: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = ({
  setActiveTodo,
  setCompletedTodo,
  query,
  setQuery,
}) => {
  const [status, setStatus] = React.useState('all');

  const statusHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setStatus(value);

    if (value === 'active') {
      setActiveTodo(true);
      setCompletedTodo(false);

      return;
    }

    if (value === 'completed') {
      setCompletedTodo(true);
      setActiveTodo(false);

      return;
    }

    // 'all' or any other value
    setActiveTodo(false);
    setCompletedTodo(false);
  };

  const clearSearchHandler = () => {
    setQuery('');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={statusHandler}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchHandler}
            />
          </span>
        )}
      </p>
    </form>
  );
};
