This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

--- 

### The Challenge

Build an N-level deep and branching comments thread

### Requirements

- Create a default state where no comments exist and a way to add the first comment
- Replying to a comment creates a child of that comment
- Deleting a comment also deletes its descendants
- Must be built in React
- No databases required, but show the data structure in memory

## Result

Demo: [https://nested-comments-keisto.vercel.app](https://nested-comments-keisto.vercel.app)

![app-screenshot.png](public%2Fapp-screenshot.png)
