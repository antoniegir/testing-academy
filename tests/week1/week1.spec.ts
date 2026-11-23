import { test, expect } from '@playwright/test';
import { classifyStatus, isValidEmail, getComments, countByUser, UserFactory, type Comment } from '../../src/week1';

// Self-check for src/week1.ts: don't edit this file, make it pass!

test('Ex 1: classifyStatus', () => {
  expect(classifyStatus(200)).toBe('success');
  expect(classifyStatus(204)).toBe('success');
  expect(classifyStatus(299)).toBe('success');
  expect(classifyStatus(404)).toBe('client-error');
  expect(classifyStatus(400)).toBe('client-error');
  expect(classifyStatus(500)).toBe('server-error');
  expect(classifyStatus(503)).toBe('server-error');
  expect(classifyStatus(301)).toBe('other');
  expect(classifyStatus(600)).toBe('other');
});

test('Ex 2 + 4: Comment interface & getComments', async () => {
  const comments: Comment[] = await getComments(1);
  expect(comments).toHaveLength(5);
  const first = comments[0] as unknown as Record<string, unknown>;
  for (const key of ['postId', 'id', 'name', 'email', 'body']) expect(first).toHaveProperty(key);
  expect(comments.every((c: any) => c.postId === 1)).toBe(true);
});

test('Ex 3: isValidEmail', () => {
  expect(isValidEmail('ana@test.com')).toBe(true);
  expect(isValidEmail('Eliseo@gardner.biz')).toBe(true);
  expect(isValidEmail('no-at-sign.com')).toBe(false);
  expect(isValidEmail('ana@nodot')).toBe(false);
  expect(isValidEmail('ana @test.com')).toBe(false);
  expect(isValidEmail('')).toBe(false);
});

test('Ex 5: countByUser', () => {
  expect(countByUser([])).toEqual({});
  expect(countByUser([{ userId: 1 }, { userId: 1 }, { userId: 2 }])).toEqual({ 1: 2, 2: 1 });
});

test('Ex 6: UserFactory', () => {
  const f = new UserFactory();
  expect(f.next()).toEqual({ username: 'user_1', email: 'user_1@test.com' });
  expect(f.next()).toEqual({ username: 'user_2', email: 'user_2@test.com' });
  expect(new UserFactory().next().username).toBe('user_1'); // each factory starts fresh
});
