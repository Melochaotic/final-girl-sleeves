# Final Girl Sleeves

## Why do it?

I wanted to ensure my [Final Girl Games](https://vanrydergames.com/pages/final-girl) were all protected with standard sleeves; downgrading from premium, and ended up handwriting a `.csv` file. But that was just the start...

Then I remembered @primeagen saying you should know how to open and edit a file in your chosen language... so lets manipulate it with [TypeScript](https://www.typescriptlang.org/) enhanced JS!

## Running the project

### Quick setup

Since node V22.6.0 you can [run TypeScript natively](https://nodejs.org/en/learn/typescript/run-natively) so just run this to get started:

```zsh
node index.ts
```

### Full setup

Install dependencies with:

```zsh
pnpm i
```

Then you can compile/run the code with:

```zsh
pnpm run dev
```

## Tooling

I began this project with a few staples and reluctantly added some basic typescript compilation.

Maybe eventually this will become an actual CLI program, using [commander](https://github.com/tj/commander.js).

## Force PNPM because NPM is :poop:

This project forces PNPM by following [this helpful guide](https://www.freecodecamp.org/news/how-to-force-use-yarn-or-npm/)
