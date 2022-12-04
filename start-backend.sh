# Read .env
set -o allexport
source .env
set +o allexport

mkdir $APP_NAME
cd $APP_NAME

# Init Project
mkdir $APP_NAME-backend
cd $APP_NAME-backend

npm init private

npm pkg set name="$APP_NAME-backend"

# Init Git
curl -o .gitignore https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/.gitignore
git init
git add .
git commit -m "chore: Init project"

# Init Conventional Commit
npm install --save-dev @commitlint/cli @commitlint/config-conventional
curl -o commitlint.config.ts https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/commitlint.config.ts
git add .
git commit -m "chore: Init Conventional Commit"

# Init Husky
npm install --save-dev husky
npm pkg set scripts.prepare="husky install"
npm run prepare
npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-commit "branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
if [ "$branch" == "main" ]
then
    npm run test;
fi"
git add .
git commit -m "chore: Init Husky"

# Init Dotenv
npm install --save-dev dotenv-cli
git add .
git commit -m "chore: Init Dotenv"

# Install estlint and vscode plugin and settings
mkdir .vscode
curl -o .vscode/extensions.json https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/.vscode/extensions.json
curl -o .vscode/settings.json https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/.vscode/settings.json
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-airbnb-base eslint-import-resolver-typescript eslint-plugin-etc eslint-plugin-import eslint-plugin-unicorn eslint-plugin-security
curl -o .eslintrc.json https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/.eslintrc.json
git add .
git commit -m "chore: Install estlint and vscode plugin and settings"

# Install typescript and Test Libraries
npm install --save-dev typescript vitest @vitest/coverage-c8
npm install --save-dev @stryker-mutator/core @stryker-mutator/typescript-checker
npm install vitest
curl -o tsconfig.json https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/tsconfig.json
curl -o vite.config.ts https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/vite.config.ts
curl -o stryker.conf.json https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/stryker.conf.json
git add .
git commit -m "chore: Install typescript and Test Libraries"

# Add script in package.json
npm pkg set scripts.test="vitest run"
npm pkg set scripts.test:watch="vitest watch"
npm pkg set scripts.test:mutation="npx -y stryker@latest run"
npm pkg set scripts.test:coverage="vitest run --coverage"
npm pkg set scripts.test:report="vitest run --reporter=json --reporter=junit --outputFile.json=./test-report/report.json --outputFile.junit=./test-report/report.xml"
npm pkg set scripts.ttest:integration: "dotenv -e .env.test -- vitest run --config=./vitest-integration.config.ts",
npm pkg set scripts.lint="eslint ./src --ext .js,.jsx,.ts,.tsx"
npm pkg set scripts.format="eslint ./src --ext .js,.jsx,.ts,.tsx --fix"
git add .
git commit -m "chore: Add script in package.json"

# Create workspace
mkdir ./src
mkdir ./src/app
mkdir ./src/app/core
mkdir ./src/app/domain
mkdir ./src/app/infra
mkdir ./src./common
npm init private -w ./src/app/core
npm init private -w ./src/app/domain
npm init private -w ./src/app/infra
npm init private -w ./src/common
npm pkg set workspaces='[
    "src/app/core",
    "src/app/domain",
    "src/app/infra",
    "src/common"
  ]'
git add .
git commit -m "chore: Create workspace"

# Add dependencies between workspaces

## Domain
npm pkg -w src/app/domain set dependencies.common="file:../../common"
## Core
npm pkg -w src/app/core set dependencies.common="file:../../common"
npm pkg -w src/app/core set dependencies.app-domain="file:../domain"
## Infra
npm pkg -w src/app/infra set dependencies.common="file:../../common"
npm pkg -w src/app/infra set dependencies.app-core= "file:../core"

npm install
git add .
git commit -m "chore: Add dependencies between workspaces"

# Update all libraries (can be dangerous)
npm pkg set scripts.update-dependencies="npx -y npm-check-updates@latest -u && npx -ws -y npm-check-updates@latest -u"
npm run update-dependencies
npm install

git add .
git commit -m "chore: Update all libraries"

# Download code template and install library
curl https://codeload.github.com/Template-in-a-glass/template-backend/tar.gz/main | tar -xz --strip=1 template-landing-page-next-app-main/src/
npm install 

git add .
git commit -m "feat: Download code template and install library"