// src/App.jsx
import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    const text = task.trim();
    if (!text) return;
    const newTodo = { id: Date.now(), text, done: false };
    setTodos(prev => [newTodo, ...prev]); // add new todo
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd(); // Enter adds too
  };

  const toggleDone = (id) =>
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const removeTodo = (id) =>
    setTodos(prev => prev.filter(t => t.id !== id));

  return (
    <div className="app">
      <h1>To-Do List (dynamic with map())</h1>

      <div style={{display: "flex", gap: 8, marginBottom: 12}}>
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a task and press Add or Enter"
          style={{flex:1, padding:8}}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <h2>Tasks ({todos.length})</h2>

      <ul style={{padding:0, listStyle:"none"}}>
        {todos.length === 0 && <li style={{color:"#666"}}>No tasks yet</li>}

        {/* ← HERE is the map() that renders the list dynamically */}
        {todos.map(todo => (
          <li key={todo.id} style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"8px 0", borderBottom:"1px solid #eee"
          }}>
            <label style={{display:"flex", alignItems:"center", gap:8}}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(todo.id)}
              />
              <span style={{textDecoration: todo.done ? "line-through" : "none"}}>
                {todo.text}
              </span>
            </label>

            <div>
              <button onClick={() => removeTodo(todo.id)} style={{marginLeft:8}}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}