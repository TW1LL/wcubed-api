# wcubed-api

## prereqs for development

```
    npm install -g nodemon typescript concurrently
    npm install
```

## prereqs for production
```
    npm install -g nodemon typescript
```

## To run for development

```
    npm start
```
It will 
* compile and watch ts
* run the server (restart on ts compile)
* build models (rebuild on ts models compile)


## To run for production
```
    # if you haven't already - npm install
    nodemon build/app.js
``
It will
* restart when there are changes 
* run the server and restart on crash

