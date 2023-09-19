import { Input, Button, FormItem, FormLayout } from '@vkontakte/vkui';
import { useState } from 'react';

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
    <FormLayout onSubmit={handleSubmit}>
      <FormItem>
        <Input
          value={userInput}
          type="text"
          onChange={handleChange}
          placeholder="Новая задача..."
          after={
            <Button size="l" type="submit">
              Добавить
            </Button>
          }
        />
      </FormItem>
    </FormLayout>
  );
}
