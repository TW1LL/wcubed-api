cd /var/node/wcubed-spa
git pull
rm /var/node/wcubed-spa/src/environments/environment.ts
mv /var/node/wcubed-spa/src/environments/environment.prod.ts /var/node/wcubed-spa/src/environments/environment.ts
ng build -prod