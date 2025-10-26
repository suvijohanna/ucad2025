# Back-end 1: Node.js perusteet - Suvi Mynttinen

Osiot 1-4 tehty ohjeiden mukaan. Osiossa 5 lisäsin REST API:in toiminnallisuuden, jolla haetaan listan itemien lukumäärä. Testattu VSCodessa sekä Postmanilla ja kaikki toiminnallisuudet toimivat. Alla toiminnallisuudet:

### Get server root

GET http://localhost:3000/

### GET /items

GET http://localhost:3000/items

### GET /items/:id

GET http://localhost:3000/items/2

### Add new item

POST http://localhost:3000/items
content-type: application/json

{
"name": "New Item"
}

### Update existing item

PUT http://localhost:3000/items/2
content-type: application/json

{
"name": "New Item Name"
}

### Delete item

DELETE http://localhost:3000/items/2

### Get number of items

GET http://localhost:3000/stats
