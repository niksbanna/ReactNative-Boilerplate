/**
 * Seed script to populate the app with mock data
 * This is useful for development and testing
 */

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const mockPosts: Post[] = [
  {
    userId: 1,
    id: 1,
    title: 'Getting Started with React Native',
    body: 'React Native is a framework for building native mobile apps using React and JavaScript.',
  },
  {
    userId: 1,
    id: 2,
    title: 'Understanding Redux Toolkit',
    body: 'Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development.',
  },
  {
    userId: 1,
    id: 3,
    title: 'TypeScript Best Practices',
    body: 'TypeScript adds static typing to JavaScript, helping catch errors early and improve code quality.',
  },
];

console.log('Seeding data...');
console.log('Mock posts:', mockPosts);
console.log('Seed completed! You can use jsonplaceholder.typicode.com for real data.');
