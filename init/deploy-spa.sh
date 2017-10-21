cd /var/node/wcubed-spa
git pull
rm /var/node/wcubed-spa/src/environment.ts
mv /var/node/wcubed-spa/src/environment.prod.ts /var/node/wcubed-spa/src/environment.ts
ng build -prod