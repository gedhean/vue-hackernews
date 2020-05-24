#!/usr/bin/env sh

# abort on errors
set -e

npm run test
npm run build

cd dist

git init
git add -A
git commit -m "deploy"


git push -f git@github.com:gedhean/vue-hackernews.git master:gh-pages
