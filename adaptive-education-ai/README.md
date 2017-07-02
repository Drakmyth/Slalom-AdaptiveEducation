# How to use this adaptive-education-ai
1. Install dependencies - `npm install`
2. Compile - `gulp scripts`
3. Compile assets - `gulp assets`
4. Run the development server - `npm start`

# postman collection
https://www.getpostman.com/collections/da6bc882172cce02f8df

# Calling api
1. Open Postman

# analyze text (Has to be run first)
POST http://localhost:3000/api/watson/analyze-text
With x-www-form-urlencoded
Key = text
Value = <paragraph>

# get Subject Action Object Type Questions
GET http://localhost:3000/api/watson/get-sao-questions

