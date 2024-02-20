import React, { useState } from "react";
import "./App.css";

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleTodoTitle = function (index) {
    setTodoTitle(index.target.value);
  }; //i

  const handleTodoText = function (index) {
    setTodoText(index.target.value);
  };

  const handleTodos = function (title, text) {
    if (!todoTitle.trim() || !todoText.trim()) {
      alert("제목과 내용을 모두 입력하세요!");
      return;
    } else {
      const newTodos = { title: todoTitle, text: todoText };
      setTodos([...todos, newTodos]);
      setTodoTitle("");
      setTodoText("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newCompletedTodos = [...completedTodos, todos[index]];
    setCompletedTodos(newCompletedTodos);
    deleteTodo(index);
  };

  const deleteCompletedTodo = (index) => {
    const newCompletedTodos = completedTodos.filter(
      (_, todoIndex) => todoIndex !== index
    );
    setCompletedTodos(newCompletedTodos);
  };

  const cancelCompletion = (index) => {
    const newTodos = [...todos, completedTodos[index]];
    setTodos(newTodos);
    deleteCompletedTodo(index);
  };

  const todoBox = todos.map(function (todo, index) {
    return (
      <div key={index} className="todo-box">
        <div className="todolist-title">
          <strong>{todo.title}</strong>
        </div>
        <div className="todolist-text">
          <span>{todo.text}</span>
        </div>
        <div className="buttons-todolist">
          <button
            onClick={() => deleteTodo(index)}
            className="button-delete-todolist"
          >
            삭제
          </button>
          <button
            onClick={() => completeTodo(index)}
            className="button-done-todolist"
          >
            완료
          </button>
        </div>
      </div>
    );
  });

  const completedTodoBox = completedTodos.map((todo, index) => (
    <div key={index} className="todo-box">
      <div className="todolist-title">
        <strong>{todo.title}</strong>
      </div>
      <div className="todolist-text">
        <span>{todo.text}</span>
      </div>
      <div className="buttons-todolist">
        <button
          onClick={() => deleteCompletedTodo(index)}
          className="button-delete-todolist"
        >
          삭제
        </button>
        <button
          onClick={() => cancelCompletion(index)}
          className="button-done-todolist"
        >
          취소
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <div className="layOut">
        <div className="todoTitle">Todo List</div>
        <div className="inputs">
          <div className="input-title">
            {" "}
            제목:
            <input
              value={todoTitle}
              onChange={handleTodoTitle}
              className="text-box"
            ></input>
          </div>
          <div className="input-text">
            내용:
            <input
              value={todoText}
              onChange={handleTodoText}
              className="text-box"
            ></input>
          </div>
          <div>
            {" "}
            <button onClick={handleTodos} className="button-add">
              추가하기
            </button>
          </div>
        </div>
        <div className="working">
          working!🏃🏻
          {todoBox}
        </div>

        <div className="done">Done!!!!🏆 {completedTodoBox}</div>
      </div>
    </>
  );
}

export default App;
