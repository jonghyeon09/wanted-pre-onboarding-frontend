import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [modify, setModify] = useState(null);
  const [modifyText, setModifyText] = useState("");

  const instance = axios.create({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const handleChange = (e) => setText(e.target.value);
  const handleChangeModify = (e) => setModifyText(e.target.value);
  const fetchData = async () => {
    try {
      const response = await instance.get("/todos");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreate = async () => {
    try {
      await instance.post("/todos", {
        todo: text,
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await instance.delete(`/todos/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheked = async (e, id, todo) => {
    try {
      await instance.put(`/todos/${id}`, {
        todo,
        isCompleted: e.target.checked,
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id, isCompleted) => {
    try {
      await instance.put(`/todos/${id}`, {
        todo: modifyText,
        isCompleted,
      });
      setModify(null);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div>
        <input
          data-testid="new-todo-input"
          className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          onChange={handleChange}
        />
        <button
          data-testid="new-todo-add-button"
          className="rounded-md border py-1.5 px-2 mx-2 bg-gray-300"
          onClick={handleCreate}
        >
          추가
        </button>
      </div>
      <div className="flex flex-col items-start mt-4">
        {todos.map((todo) =>
          todo.id === modify ? (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={todo.isCompleted}
                  onChange={(e) => handleCheked(e, todo.id, todo.todo)}
                />
              </label>
              <input
                data-testid="modify-input"
                className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={handleChangeModify}
              />
              <button
                data-testid="submit-button"
                className="rounded-md border py-1.5 px-2 bg-gray-300"
                onClick={(e) => handleUpdate(todo.id, todo.isCompleted)}
              >
                제출
              </button>
              <button
                data-testid="cancel-button"
                className="rounded-md border py-1.5 px-2 bg-gray-300"
                onClick={() => setModify(null)}
              >
                취소
              </button>
            </li>
          ) : (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={todo.isCompleted}
                  onChange={(e) => handleCheked(e, todo.id, todo.todo)}
                />
                <span className="mr-4">{todo.todo}</span>
              </label>
              <button
                data-testid="modify-button"
                className="rounded-md border py-1.5 px-2 bg-gray-300"
                onClick={() => setModify(todo.id)}
              >
                수정
              </button>
              <button
                data-testid="delete-button"
                className="rounded-md border py-1.5 px-2 bg-gray-300"
                onClick={() => handleDelete(todo.id)}
              >
                삭제
              </button>
            </li>
          )
        )}
      </div>
    </div>
  );
};

export default ToDo;
