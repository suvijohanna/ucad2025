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


<img width="1327" height="948" alt="t1" src="https://github.com/user-attachments/assets/d126e76c-17b9-4f25-8b08-cf29b2cf1a42" />
