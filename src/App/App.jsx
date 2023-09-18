import { useState } from 'react';
import { TodoItem } from '../TodoItem';
import { TodoForm } from '../TodoForm';
import defailtData from './defaultData.json';
import './styles.css';

export function App() {
  const [todos, setTodos] = useState(defailtData);

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: new Date().getTime(),
        task: userInput,
        completed: false,
      };
      setTodos([...todos, newItem]);
    }
  };

  const removeTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const checkedCount = todos.reduce((acc, todo) => {
    if (todo.completed) {
      acc += 1;
    }

    return acc;
  }, 0);

  return (
    <div className="App">
      <h1>Список задач 📝</h1>
      <div className="App__box">
        <TodoForm addTask={addTask} />
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            toggleTask={handleToggle}
            removeTask={removeTask}
          />
        ))}
      </div>
      <div className="App__footer">
        {checkedCount === todos.length
          ? `Все задачи выполнены ✨`
          : `Выполнено: ${checkedCount} из ${todos.length}`}
      </div>
    </div>
  );
}
