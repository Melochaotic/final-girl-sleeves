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

Step 2. Register `fgs` globally:

```zsh
pnpm add -g .
```

> [!NOTE]
> `pnpm >= 11` removed the no-argument and `--global` forms of `pnpm link`;
> `pnpm add -g .` is the supported way to make a local package's `bin`
> available system-wide.
>
> For a local directory pnpm links the package rather than copying it, so the
> installed `fgs` runs your current source — code and the git-tracked
> `data/` CSV stay in sync automatically. If you move or delete the checkout,
> re-run `pnpm add -g .` to relink it.

Step 3. Run it from any directory:

```zsh
fgs --help
```

To unregister:

```zsh
pnpm rm -g final-girl-sleeves
```

> [!NOTE]
> The command executes the TypeScript directly and needs Node >= 23.6 (native
> type stripping). The `data/` CSV is resolved relative to the project, so
> `fgs` works from anywhere on your machine.

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
