import React from 'react';
import './style.scss';

function TodoSearch() {
  return (
    <div className="todo-search">
      <div className="todo-search__item">
        <label htmlFor="search-type" className="blind">검색구분</label>
        <select
          id="search-type">
          <option></option>
        </select>
        <label htmlFor="search-text" className="blind">검색단어</label>
        <input
          type="text"
          id="search-text"
          placeholder="검색어를 입력하세요." />
        <button
          type="button"
          className="button">
          검색
        </button>
        <div className="todo-search--status">
          <span className="checkbox">
            <input
              type="checkbox"
              id="completed-status" />
            <label htmlFor="completed-status">완료</label>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TodoSearch;
