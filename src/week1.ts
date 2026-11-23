/**
 * WEEK 1: TypeScript exercises
 * Replace every `throw new Error('TODO')` with your solution.
 * Check yourself:  npm run test:week1
 *
 * Tip: hover over a type in your editor (VS Code) to see what TypeScript knows about it.
 */

// ---------------------------------------------------------------------------
// Exercise 1: Union types
// A test often needs to know if an HTTP status code means success.
// Return 'success' for 200-299, 'client-error' for 400-499,
// 'server-error' for 500-599, and 'other' for anything else.
// ---------------------------------------------------------------------------
export type StatusGroup = 'success' | 'client-error' | 'server-error' | 'other';

export function classifyStatus(status: number): StatusGroup {
  throw new Error('TODO');
}

// ---------------------------------------------------------------------------
// Exercise 2: Interfaces
// Write the `Comment` interface to describe this JSON from
// https://jsonplaceholder.typicode.com/comments/1
//   { "postId": 1, "id": 1, "name": "id labore ...", "email": "Eliseo@gardner.biz", "body": "laudantium ..." }
// ---------------------------------------------------------------------------
export interface Comment {
  // TODO: add the 5 fields with the correct types
}

// ---------------------------------------------------------------------------
// Exercise 3: Strings + regular expressions
// Return true if `email` looks valid: something@something.something, no spaces.
// ---------------------------------------------------------------------------
export function isValidEmail(email: string): boolean {
  throw new Error('TODO');
}

// ---------------------------------------------------------------------------
// Exercise 4: async / await + fetch
// Fetch all comments for a post:  GET https://jsonplaceholder.typicode.com/comments?postId=<postId>
// Throw an Error if the response is not ok.
// ---------------------------------------------------------------------------
export async function getComments(postId: number): Promise<Comment[]> {
  throw new Error('TODO');
}

// ---------------------------------------------------------------------------
// Exercise 5: Array methods (reduce / for...of)
// Count how many items each user has.
// Example: [{userId:1},{userId:1},{userId:2}]  ->  { 1: 2, 2: 1 }
// ---------------------------------------------------------------------------
export function countByUser(items: { userId: number }[]): Record<number, number> {
  throw new Error('TODO');
}

// ---------------------------------------------------------------------------
// Exercise 6: Classes (warm-up for Page Objects)
// Build a tiny test-data factory. Each call to next() returns a NEW unique user:
//   next() -> { username: 'user_1', email: 'user_1@test.com' }
//   next() -> { username: 'user_2', email: 'user_2@test.com' }
// Use a private counter field.
// ---------------------------------------------------------------------------
export class UserFactory {
  next(): { username: string; email: string } {
    throw new Error('TODO');
  }
}
