import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="todo">
      <div className="todo-inner">
        <h1 className="todo__title">TODO APP</h1>
        <div className="todo__input">
          <input type="text" />
          <button>Add</button>
        </div>
        <ul className="todo__list">
          <li>
            <input type="checkbox" />
            <div>
              <strong>todo contents</strong>
              <p>등록일: </p>
              <p>최종 수정일: </p>
              <p>참조 Todo: </p>
            </div>
            <button>Delete</button>
          </li>
        </ul>
        <div className="todo__paging">paging</div>
      </div>
    </div>
  );
}

export default App;
