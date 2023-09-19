import { useEffect, useState } from 'react';
import { TodoItem } from '../TodoItem';
import { TodoForm } from '../TodoForm';
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  PanelSpinner,
  Footer,
} from '@vkontakte/vkui';
import defaultData from './defaultData.json';
import vkStorage from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

const STORAGE_KEY = 'list';

export function App() {
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    vkStorage
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
      vkStorage.send('VKWebAppStorageSet', {
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
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader separator={false}>Список задач 📝</PanelHeader>
              {loaded ? (
                <>
                  <TodoForm addTask={addTask} />
                  {todos.map((todo) => (
                    <TodoItem
                      todo={todo}
                      key={todo.id}
                      toggleTask={handleToggle}
                      removeTask={removeTask}
                    />
                  ))}
                  <Footer>
                    {checkedCount === todos.length
                      ? `Все задачи выполнены ✨`
                      : `Выполнено: ${checkedCount} из ${todos.length}`}
                  </Footer>
                </>
              ) : (
                <PanelSpinner />
              )}
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}
