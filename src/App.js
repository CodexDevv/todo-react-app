import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import TodoList from "./TodoList";
import "./index.css";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "TODO_APP.TODO";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [{ id: uuidv4(), name: name, complete: false }, ...prevTodos];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function handleClearAll() {
    setTodos([]);
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleAddTodo();
      }

      if (event.code === "Delete") {
        event.preventDefault();
        handleClearAll();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  // I can't seem to figure out a way how to create a transition for when i clear the list

  return (
    <>
      <div className="ndiv">
        <h1>Todo List</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <div>
          <input
            className="input-box"
            ref={todoNameRef}
            type="text"
            placeholder="Go shopping..."
          />
        </div>
        <div className="buttons">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddTodo}
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
          >
            Add Todo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClearAll}
          >
            Clear List
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClearTodo}
          >
            Clear Completed
          </motion.button>
        </div>
        <div className="breek">
          {todos.filter((todo) => !todo.complete).length} left to do
        </div>
        <div className="desc-info">
          <span>
            <p>Black means done. Transparent means to-do.</p>
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
