pm2 stop build/app.js
git pull
tsc
npm install
pm2 start build/app.js
