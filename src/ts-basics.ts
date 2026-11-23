/**
 * TypeScript основи за автоматизација
 * Run with:  npm run ts:basics
 *
 * Each section is a concept you will use daily in Playwright tests.
 */

// 1. Primitive types ---------------------------------------------------------
const baseUrl: string = 'https://jsonplaceholder.typicode.com';
const timeoutMs: number = 5000;
const isCI: boolean = Boolean(process.env.CI);

// 2. Arrays & union types -----------------------------------------------------
const browsers: string[] = ['chromium', 'firefox', 'webkit'];
type Env = 'dev' | 'staging' | 'prod'; // only these 3 values are allowed
const env: Env = 'staging';

// 3. Interfaces: describe the shape of API data --------------------------------
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Optional (?) and readonly properties
interface TestUser {
  readonly username: string;
  role: 'admin' | 'customer';
  email?: string;
}

// 4. Functions with typed params & return values -------------------------------
function buildUrl(path: string, query?: Record<string, string | number>): string {
  const url = new URL(path, baseUrl);
  if (query) {
    for (const [key, value] of Object.entries(query)) url.searchParams.set(key, String(value));
  }
  return url.toString();
}

// Arrow function + default parameter
const makeUser = (username: string, role: TestUser['role'] = 'customer'): TestUser => ({
  username,
  role,
});

// 5. async / await: every Playwright action is asynchronous --------------------
async function getPost(id: number): Promise<Post> {
  const res = await fetch(buildUrl(`/posts/${id}`));
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as Post;
}

// 6. Generics: a reusable helper that works with any type ----------------------
function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// 7. Classes: the basis of the Page Object Model (see pages/TodoPage.ts) ------
class Counter {
  private count = 0;
  increment(): number {
    return ++this.count;
  }
}

// 8. Array methods you will use for assertions on lists ------------------------
const statusCodes = [200, 201, 404, 500];
const errors = statusCodes.filter((code) => code >= 400); // [404, 500]
const labels = statusCodes.map((code) => `HTTP ${code}`);
const allValid = statusCodes.every((code) => code >= 100 && code < 600);

// ---- Run everything ---------------------------------------------------------
async function main() {
  console.log({ baseUrl, timeoutMs, isCI, env, browsers });
  console.log('URL:', buildUrl('/posts', { userId: 1 }));
  console.log('User:', makeUser('ana'));
  console.log('Random browser:', pickRandom(browsers));
  console.log('Errors:', errors, 'Labels:', labels, 'All valid:', allValid);

  const counter = new Counter();
  counter.increment();
  console.log('Counter:', counter.increment());

  try {
    const post = await getPost(1);
    console.log('Post #1 title:', post.title);
  } catch (err) {
    console.error('Network call failed (are you offline?):', (err as Error).message);
  }
}

main();
