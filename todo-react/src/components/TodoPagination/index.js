import React from 'react';
import './style.scss';

function TodoPagination() {
  return (
    <div className="todo-pagination">
      <button
        type="button"
        className="todo-pagination__prev">
        <arrow-left />
      </button>
      <button
        type="button"
        className="todo-pagination__link">
        1
      </button>
      <button
        type="button"
        className="todo-pagination__next">
        <arrow-right />
      </button>
    </div>
  );
}

export default TodoPagination;
