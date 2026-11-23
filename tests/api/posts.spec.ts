import { test, expect } from '@playwright/test';

/**
 * REST API testing in Playwright: the same checks as postman/QA-Academy.postman_collection.json,
 * but in code, so they run in CI next to UI tests.
 * API under test: https://jsonplaceholder.typicode.com (fake API, writes are not persisted)
 */
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

test.describe('Posts API', () => {
  test('GET /posts returns a list of 100 posts', async ({ request }) => {
    const res = await request.get('/posts');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/json');

    const posts: Post[] = await res.json();
    expect(posts).toHaveLength(100);
  });

  test('GET /posts/1 returns the correct schema', async ({ request }) => {
    const res = await request.get('/posts/1');
    expect(res.ok()).toBeTruthy();

    const post: Post = await res.json();
    expect(post).toMatchObject({ id: 1, userId: 1 });
    expect(typeof post.title).toBe('string');
    expect(post.body.length).toBeGreaterThan(0);
  });

  test('GET with query params filters results', async ({ request }) => {
    const res = await request.get('/posts', { params: { userId: 2 } });
    const posts: Post[] = await res.json();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.userId === 2)).toBe(true);
  });

  test('POST /posts creates a post (201)', async ({ request }) => {
    const payload = { title: 'QA Academy', body: 'Created by Playwright', userId: 1 };
    const res = await request.post('/posts', { data: payload });
    expect(res.status()).toBe(201);
    expect(await res.json()).toMatchObject({ ...payload, id: expect.any(Number) });
  });

  test('PUT /posts/1 replaces a post', async ({ request }) => {
    const res = await request.put('/posts/1', {
      data: { id: 1, title: 'Updated', body: 'New body', userId: 1 },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).title).toBe('Updated');
  });

  test('PATCH /posts/1 updates one field', async ({ request }) => {
    const res = await request.patch('/posts/1', { data: { title: 'Patched' } });
    expect(res.status()).toBe(200);
    expect((await res.json()).title).toBe('Patched');
  });

  test('DELETE /posts/1 returns 200', async ({ request }) => {
    const res = await request.delete('/posts/1');
    expect(res.status()).toBe(200);
  });

  test('negative: GET non-existing post returns 404', async ({ request }) => {
    const res = await request.get('/posts/99999');
    expect(res.status()).toBe(404);
  });
});
