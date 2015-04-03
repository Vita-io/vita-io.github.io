# Vita.IO

The website of Vita.IO is meant to run on Github Pages. Github Pages doesn't allow plugins to run (safe-mode) so in order to compile SASS, compress JS and compress images, we use gulp. Follow the installation instructions below to get up and running.

## Installation

```bash
npm install
bower install```

## Running gulp

During development it's nice to have features as auto-compilation and auto-reload. In order to use these features run `gulp` on the command-line.

## Releasing an update

Every push to Github will automaticly update the website. The assets (JS, images, SASS) used should be compiled with gulp before committing. So after a change run:

```gulp release
git add -a
git commit -m "your update message"
git push
# and we're live```

## Editing

Folder overview:

- `src/`:
  - texts, like vacancies
  - templaces
  - generated assets (css, js, images, svg) -> * DON'T EDIT THESE HERE, BUT IN `assets/`
- `assets/`: source assets; these will be optimized by gulp
- `_site/`: generated jekyll files; never modify this folder
