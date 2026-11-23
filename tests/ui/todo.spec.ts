import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

/**
 * Автоматско тестирање со Playwright: real test scenarios using the Page Object.
 */
test.describe('Todo app', () => {
  let todo: TodoPage;

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('adds new todos', async () => {
    await todo.addTodo('Write test plan', 'Run regression');
    await todo.expectTodos(['Write test plan', 'Run regression']);
    await expect(todo.todoCount).toHaveText('2 items left');
  });

  test('completes a todo and filters by status', async () => {
    await todo.addTodo('Report bug', 'Retest fix');
    await todo.complete('Report bug');

    await todo.filterBy('Active');
    await todo.expectTodos(['Retest fix']);

    await todo.filterBy('Completed');
    await todo.expectTodos(['Report bug']);
  });

  test('deletes a todo', async () => {
    await todo.addTodo('Keep me', 'Delete me');
    await todo.delete('Delete me');
    await todo.expectTodos(['Keep me']);
  });

  test('clears completed todos', async () => {
    await todo.addTodo('A', 'B');
    await todo.complete('A');
    await todo.clearCompletedButton.click();
    await todo.expectTodos(['B']);
  });

  // Data-driven testing: one test body, many inputs
  for (const title of ['Simple', 'Ќирилица работи', '  trimmed  ', '🎉 emoji']) {
    test(`accepts title: "${title}"`, async () => {
      await todo.addTodo(title);
      await todo.expectTodos([title.trim()]);
    });
  }
});
