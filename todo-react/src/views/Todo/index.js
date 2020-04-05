import React, { useState, useEffect } from 'react';
import TodoCreate from '../../components/TodoCreate';
import TodoSearch from "../../components/TodoSearch";
import TodoItem from "../../components/TodoItem";
import TodoPagination from "../../components/TodoPagination";
import TodoApi from '../../api/todo';
import './style.scss';

function Todo() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const requestData = {
        condition: {},
        paging: {
          no: 1,
        },
      };
      const {data} = await TodoApi.list(requestData);
      const todos = data.todos.map((todo) => ({
        ...todo,
        referenceIds: todo.referenceIds.join(', '),
      }));
      setTodos(todos);
      // this.paging = data.paging;
    };
    fetchData();
  }, []);

  return (
    <div className="todo">
      <div className="todo__inner">
        <TodoCreate />
        <div className="todo__board">
          <TodoSearch />
          <ul className="todo__list">
            {todos.map(todo => (
              <li className="todo__list__item" key={todo.id}>
                <TodoItem todo={todo}/>
              </li>
            ))}
          </ul>
          <TodoPagination />
        </div>
      </div>
    </div>
  );
}

export default Todo;
