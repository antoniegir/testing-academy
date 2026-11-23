import { type Locator, type Page, expect } from '@playwright/test';

/**
 * Page Object Model (POM) for https://demo.playwright.dev/todomvc
 * Locators live in ONE place, tests read like plain English.
 */
export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Preferred: user-facing locators (placeholder, role, test id)
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoCount = page.getByTestId('todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    await this.page.goto('/todomvc');
  }

  async addTodo(...titles: string[]) {
    for (const title of titles) {
      await this.newTodoInput.fill(title);
      await this.newTodoInput.press('Enter');
    }
  }

  item(title: string): Locator {
    // Filtering: narrow a list down to the one item that has this text
    return this.todoItems.filter({ hasText: title });
  }

  async complete(title: string) {
    await this.item(title).getByRole('checkbox').check();
  }

  async delete(title: string) {
    const row = this.item(title);
    await row.hover(); // delete button only appears on hover
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async filterBy(name: 'All' | 'Active' | 'Completed') {
    await this.page.getByRole('link', { name, exact: true }).click();
  }

  async expectTodos(titles: string[]) {
    await expect(this.todoItems).toHaveText(titles);
  }
}
