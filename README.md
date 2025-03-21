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

## Features list

- [x] Display game details & sleeve requirements by title
- [X] List all titles
- [x] Help command - List all commands (make this default when no args)
- [x] List titles of a type e.g. unsleeved
- [x] Refactor opening & processing file to reusable component
- [x] Total sleeves required to sleeve all
- [x] Total sleeves required to finish sleeving specified type
- [x] Show total cards in `sleeve` command when filtered
- [x] Update sleeve type?!?!?!
- [x] Maintain whitespace when updating sleeves
- [x] Rename `colTitles` -> `colHeaders`
- [x] Count and/or percentage of sleeve type - aiming for 100% ryker
- [x] Improve `help` command: each command file should export help text to display here
- [ ] Refactor with [parseArgs](https://nodejs.org/api/util.html#utilparseargsconfig)
- [ ] CONFETTI when 100% sleeved & 100% Ryker
- [ ] Hardcode list of titles for types & input error handing ( like `SleeveType`)
- [ ] create function to fetch named column from data row
- [ ] Use emojis to indicate command status
- [ ] ??? Refactor to number count object instead of seperate vars
- [ ] !!!TESTING!!!
- [ ] ...MOAR!
