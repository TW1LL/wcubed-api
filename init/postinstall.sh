echo "Copying problem files..."
cp init/easypost.js node_modules/@easypost/api/easypost.js
cp init/koa/index.d.ts node_modules/@types/koa/index.d.ts
echo "Updating models.ts"
node src/models/index.js
echo "Compiling Typescript"
tsc
echo "Done!"
