# Read .env
set -o allexport
source .env
set +o allexport

mkdir $APP_NAME
cd $APP_NAME

# Login Github
echo $GH_TOKEN | gh auth login --with-token

# Init Project
mkdir $APP_NAME-backend
cd $APP_NAME-backend

npm init --private

npm pkg set name="$APP_NAME-backend"

# Init Git
curl -o .gitignore https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/.gitignore
git init
git add .
git commit -m "Init project"

# Install estlint and vscode plugin and settings
mkdir .vscode
curl -o .vscode/extensions.json https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/.vscode/extensions.json
curl -o .vscode/settings.json https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/.vscode/settings.json

npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-airbnb-base eslint-import-resolver-typescript eslint-plugin-etc eslint-plugin-import eslint-plugin-unicorn

curl -o .eslintrc.json https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/.eslintrc.json

git add .
git commit -m "Install estlint and vscode plugin and settings"

# Install typescript and Test Libraries
npm install --save-dev typescript vitest @vitest/coverage-c8
npm install --save-dev @stryker-mutator/core @stryker-mutator/typescript-checker
npm install vitest
curl -o tsconfig.json https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/tsconfig.json
curl -o vite.config.ts https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/vite.config.ts

# Add script in package.json

npm pkg set scripts.test="vitest run"
npm pkg set scripts.test:watch="vitest watch"
npm pkg set scripts.test:mutation="npx -y stryker@latest run"
npm pkg set scripts.test:coverage="vitest run --coverage"
npm pkg set scripts.test:report="vitest run --reporter=json --reporter=junit --outputFile.json=./test-report/report.json --outputFile.junit=./test-report/report.xml"
npm pkg set scripts.lint="eslint ./src --ext .js,.jsx,.ts,.tsx"
npm pkg set scripts.format="eslint ./src --ext .js,.jsx,.ts,.tsx --fix"

# Create workspace

mkdir src
mkdir ./src/api
mkdir ./src/core
mkdir ./src/infra
npm init private -w ./src/api
npm init private -w ./src/core
npm init private -w ./src/infra

git add .
git commit -m "Create workspace"

# Add dependencies between workspaces
npm install -w src/core date-fns
npm pkg -w src/infra set dependencies.core="file:../core"
npm pkg -w src/api set dependencies.core="file:../core"
npm pkg -w src/api set dependencies.infra="file:../infra"
npm install

# Update all libraries (can be dangerous)
npm pkg set scripts.update-dependencies="npx -y npm-check-updates@latest -u && npx -ws -y npm-check-updates@latest -u"
npm run update-dependencies
npm install

git add .
git commit -m "Update all libraries"
