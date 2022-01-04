import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Todo({ todo, toggleTodo }) {
  const [toggle, setToggle] = useState(true);
  const [style, setStyle] = useState("todo");

  const changeToggle = () => {
    setToggle(!toggle);
    handleTodoClick();
    if (toggle) setStyle("todo2");
    else setStyle("todo");
  };

  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  //scale: [0.8, 1.0],
  //opacity: [0.4, 1.0]}}
  return (
    <div className="div-id">
      <motion.div animate={{ x: [-1000, 0] }} transition={{ duration: 0.4 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={style}
          id="todo"
          checked={todo.complete}
          type="button"
          onClick={changeToggle}
        >
          {todo.name}
        </motion.button>
      </motion.div>
    </div>
  );
}
