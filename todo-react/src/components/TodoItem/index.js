import React, { useState } from 'react';
import moment from "moment";
import './style.scss';

function TodoItem({ todo }) {
  const { id, content, createdAt, updatedAt, referenceIds, completed } = todo;
  const [isUpdate, setIsUpdate] = useState(false);
  const formatDate = (date) => moment(date).format('YYYY-MM-DD');
  const convertReferenceIds = (ids) => {
    let referenceIds = ids
      .split(',')
      .map((id) => parseInt(id.trim(), 10));
    referenceIds = referenceIds
      .filter((item, index) => referenceIds.indexOf(item) === index)
      .sort();
    return referenceIds;
  };
  const viewReferenceIds = (ids) => {
    return convertReferenceIds(ids).map((id) => `@${id}`).join(', ');
  };
  const handleUpdate = () => setIsUpdate(true);
  const handleCancel = () => {
    setIsUpdate(false);
  };
  const handleSubmit = () => {};
  const handleDelete = () => {};

  return (
    <div className="todo-item">
      <div className="todo-item__label checkbox">
        <input
          type="checkbox"
          className="todo-item__completed"
          minLength="1"
          maxLength="200" />
        <label
          className="todo-item__info"
          htmlFor="`todo-item-${todo.id}`">
          {isUpdate &&
            <input
              type="text"
              className="todo-content-update"
              value={content} />
          }
          {!isUpdate &&
            <strong className="todo-item__title">{content}</strong>
          }
          <span className="todo-item__id">ID: <em>{id}</em></span>
          <span className="todo-item__created">등록일: <em>{formatDate(createdAt)}</em></span>
          <span className="todo-item__updated">최종 수정일: <em>{formatDate(updatedAt)}</em></span>
          {isUpdate &&
            <input
              type="text"
              value={referenceIds}
              placeholder="참조 Todo id 입력 (예: 1, 2)"/>
          }
          {!isUpdate &&
            <span className="todo-item__ref">참조 Todo: <em>{viewReferenceIds(referenceIds)}</em></span>
          }
        </label>
      </div>
      <div className="todo-item__button">
        {!completed && !isUpdate &&
          <button
            type="button"
            className="button small"
            onClick={handleUpdate}>
            수정
          </button>
        }
        {isUpdate &&
          <>
            <button
              type="button"
              className="button small"
              onClick={handleSubmit(id)}>
              확인
            </button>
            <button
              type="button"
              className="button small"
              onClick={handleCancel}>
              취소
            </button>
          </>
        }
        <button
          type="button"
          className="button small"
          onClick={handleDelete(id)}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
