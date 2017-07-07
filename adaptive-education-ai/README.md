# How to use this adaptive-education-ai
1. Install dependencies - `npm install`
2. Compile - `gulp scripts`
3. Compile assets - `gulp assets`
4. Run the development server - `npm start`

# postman collection
https://www.getpostman.com/collections/ad13b32b4347fbc43232

# Calling api
1. Open Postman

# analyze text (Has to be run first)
POST http://localhost:3000/api/watson/analyze-text
With JSON
{"text" : "sometext"}

JSON results:
{"id":1,"message":"successfully analyzing text"}

# get Subject Action Object Type Questions
GET http://localhost:3000/api/watson/get-sao-questions/{id}

