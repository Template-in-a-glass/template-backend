set -o allexport
source .env
set +o allexport

mkdir $APP_NAME-backend
cd $APP_NAME-backend

# Init project
npm init private

npm pkg set name="$APP_NAME-backend"

npm install --save-dev typescript vitest
curl -o tsconfig.json https://raw.githubusercontent.com/Template-in-a-glass/template-backend/main/tsconfig.json

npm pkg set scripts.test="vitest run"
npm pkg set scripts.watch="vitest watch"
npm pkg set scripts.coverage="vitest run --coverage"

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
npm pkg set scripts.lint="eslint ./src --ext .js,.jsx,.ts,.tsx"
npm pkg set scripts.format="eslint ./src --ext .js,.jsx,.ts,.tsx --fix"

git add .
git commit -m "Install estlint and vscode plugin and settings"

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

## Update all workspaces and install libraries
npm install -w core date-fns
npm install -ws

# Update all libraries (can be dangerous)
npm pkg set scripts.update-dependencies="npx -y npm-check-updates@latest -u && npx -ws -y npm-check-updates@latest -u"
npm run update-dependencies
npm install

git add .
git commit -m "Update all libraries"
