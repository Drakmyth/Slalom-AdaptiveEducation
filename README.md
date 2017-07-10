# Server
### Installation
1. `cd adaptive-education-ai`
1. `npm install`
1. `npm install -g gulp`
1. `gulp scripts`
1. `gulp assets`
1. `npm start`

### Postman Collection
https://www.getpostman.com/collections/ad13b32b4347fbc43232

### Analyze Text (has to be run first)
POST http://localhost:3000/api/watson/analyze-text

```javascript
{
    "text":"sometext"
}
```

Expected Response:
```javascript
{
    "id":1,
    "message":"successfully analyzing text"
}
```

### Get Subject Action Object Type Questions
GET http://localhost:3000/api/watson/get-sao-questions/{id}

# Frontend
### Installation
1. `cd frontend`
1. `npm install -g webpack`
1. `npm install`
1. `npm install --only=dev`
1. `webpack`
1. Launch WebStorm
1. Open frontend folder as project
1. Right-click `index.html`
1. Select `Run 'index.html'`
