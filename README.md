# Final Girl Sleeves

## Why do it?

I wanted to ensure my [Final Girl Games](https://vanrydergames.com/pages/final-girl) were all protected with standard sleeves; downgrading from premium, and ended up handwriting a `.csv` file. But that was just the start...

Then I remembered [@ThePrimeagen](https://github.com/ThePrimeagen) saying you should know how to open and edit a file in your chosen language... so lets manipulate it with [TypeScript](https://www.typescriptlang.org/) enhanced JS!

## Running the project

There are 3 setup options

### CLI setup

Step 1. Install dependencies:

```zsh
pnpm i
```

Step 2. link command for global use

```zsh
pnpm link
```

> [!NOTE]
> To unlink the project run
>
> ```zsh
> pnpm rm -g final-girl-sleeves
> ```

Step 3. Now you can run the command globally:

```zsh
fgs
```

### Quick setup

Since node V22.6.0 you can [run TypeScript natively](https://nodejs.org/en/learn/typescript/run-natively) so just run this to get started:

```zsh
node src/index.ts
```

> [!TIP]
> You can disable the `ExperimentalWarning` by running this instead:
>
> ```zsh
> node --disable-warning=ExperimentalWarning src/index.ts
> ```

### Standard setup

Step 1. Install dependencies:

```zsh
pnpm i
```

Step 2. Compile & run the code:

```zsh
pnpm dev
```

## Tooling

I began this project with a few staples and reluctantly added some basic typescript compilation.

Maybe eventually this will become an actual CLI program, using [commander](https://github.com/tj/commander.js).

## Development Philosophy

I created this tool as a little bit of fun but also as a way to learn & explore the features.

This is why I have specifically aimed to get this running **without** third party packages so it doesn't need a compile step. The only dependencies used are to aid with development only. This means its unlikely i will ever refactor to use commander.

## Force PNPM because NPM is :poop:

This project forces PNPM by following [this helpful guide](https://www.freecodecamp.org/news/how-to-force-use-yarn-or-npm/)
