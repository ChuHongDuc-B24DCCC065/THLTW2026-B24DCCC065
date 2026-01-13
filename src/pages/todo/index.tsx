import React, { useState, useEffect } from 'react';

interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [task, setTask] = useState("");

  // Load dữ liệu
  useEffect(() => {
    const saved = localStorage.getItem('my_todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // Lưu dữ liệu
  useEffect(() => {
    localStorage.setItem('my_todos', JSON.stringify(todos));
  }, [todos]);

  const add = () => {
    if (!task) return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h2>Trang Todo App của tôi</h2>
      <div style={{ marginBottom: '20px' }}>
        <input 
          value={task} 
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nhập việc cần làm..."
          style={{ padding: '8px', marginRight: '10px', width: '250px' }}
        />
        <button onClick={add} style={{ padding: '8px 15px', cursor: 'pointer' }}>Thêm</button>
      </div>

      <ul>
        {todos.map(t => (
          <li key={t.id} style={{ marginBottom: '10px' }}>
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
              {t.text}
            </span>
            <button 
              onClick={() => setTodos(todos.filter(x => x.id !== t.id))}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;