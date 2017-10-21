cd /var/node/wcubed-spa
git pull
rm /src/environment.ts
mv /src/environment.prod.ts /src/environment.ts
ng build -prod