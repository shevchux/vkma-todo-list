import { useState } from 'react';
import './styles.css';

export function TodoForm({ addTask }) {
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        className="TodoForm__input"
        value={userInput}
        type="text"
        onChange={handleChange}
        placeholder="Новая задача..."
      />
      <button className="TodoForm__button">Добавить</button>
    </form>
  );
}
