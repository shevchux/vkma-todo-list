import { Cell, IconButton } from '@vkontakte/vkui';
import { Icon24CancelOutline } from '@vkontakte/icons';

export function TodoItem({ todo, toggleTask, removeTask }) {
  return (
    <Cell
      mode="selectable"
      checked={todo.completed}
      onChange={() => toggleTask(todo.id)}
      multiline
      after={
        <IconButton onClick={() => removeTask(todo.id)} aria-label="Удалить">
          {/* Подробнее о стилизации https://vkcom.github.io/VKUI/#/Customize */}
          <Icon24CancelOutline fill="var(--vkui--color_icon_secondary)" />
        </IconButton>
      }
    >
      {todo.task}
    </Cell>
  );
}
