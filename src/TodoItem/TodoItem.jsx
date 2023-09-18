import './styles.css';

export function TodoItem({ todo, toggleTask, removeTask }) {
  return (
    <div className={`TodoItem${todo.completed ? ' TodoItem--completed' : ''}`}>
      <label className="TodoItem__in">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTask(todo.id)}
        />
        <div>{todo.task}</div>
      </label>
      <button className="TodoItem__remove" onClick={() => removeTask(todo.id)}>
        ×
      </button>
    </div>
  );
}
