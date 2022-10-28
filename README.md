
# Mohanad Zayan




## Run Locally

Scripts


```bash
    npm install
```

```npm Start
   "npm Start" : nodemon -w src --ext ts --exec ts-node-esm src/server.ts
```


```npm run build
    "npm run build" : npx tsc
```


```npm run test
     npm run test 
```

Start the server

```bash
  npm run start
```


## API Reference

#### Resize

```http
  GET /api/resize?filename=santamonica&width=200&height=200
```


| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `filename` | `string` | **Required**.  |
| `width` | `number` | **Required**.  |
| `height` | `number` | **Required**.  |



