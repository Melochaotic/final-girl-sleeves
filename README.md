# Final Girl Sleeves

## Why do it?

I wanted to ensure my [Final Girl Games](https://vanrydergames.com/pages/final-girl) were all protected with Ryker sleeves, and ended up handwriting a `.csv` file. But that was just the start...

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
fgs --help
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

Runtime dependencies are kept to a minimum:

- [commander](https://github.com/tj/commander.js) for CLI routing
- [inquirer](https://github.com/SBoudrias/Inquirer.js) for interactive prompts.

## Force PNPM because NPM is :poop:

This project forces PNPM by following [this helpful guide](https://www.freecodecamp.org/news/how-to-force-use-yarn-or-npm/)
