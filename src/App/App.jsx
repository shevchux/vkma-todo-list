import { useEffect, useState } from 'react';
import { TodoItem } from '../TodoItem';
import { TodoForm } from '../TodoForm';
import defaultData from './defaultData.json';
import vkBridge from '@vkontakte/vk-bridge';
import './styles.css';

const STORAGE_KEY = 'list';

export function App() {
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    vkBridge
      .send('VKWebAppStorageGet', { keys: [STORAGE_KEY] })
      .then((result) => {
        try {
          setTodos(JSON.parse(result.keys[0].value));
        } catch {
          // ключа еще нет (новый пользователь)
          setTodos(defaultData);
        }

        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (loaded) {
      vkBridge.send('VKWebAppStorageSet', {
        key: STORAGE_KEY,
        value: JSON.stringify(todos),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

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
      {loaded ? (
        <>
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
        </>
      ) : (
        <div className="App__box">Загружаем...</div>
      )}
    </div>
  );
}
