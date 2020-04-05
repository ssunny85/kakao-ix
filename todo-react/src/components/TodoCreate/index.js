import React, { useState } from 'react';
import TodoApi from '../../api/todo';
import './style.scss';

function TodoCreate() {
  const [content, setContent] = useState('');
  const onChange = (e) => {
    setContent(e.target.value);
  };
  const onClick = () => {
    const request = {
      content,
    };
    TodoApi.create(request)
      .then(() => {
        setContent('');
      })
      .catch(() => {});
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div className="todo-create">
      <div className="todo-create__inner">
        <input
          type="text"
          value={content}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder="할 일을 입력해주세요." />
        <button
          type="button"
          className="button"
          onClick={onClick}>
          추가
        </button>
      </div>
    </div>
  );
}

export default TodoCreate;
