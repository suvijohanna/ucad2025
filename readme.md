# Back-end 2: Express-sovelluskehys - Suvi Mynttinen

Toteutettu backend Node.js/Expressillä, joka tarjoaa media- ja käyttäjätietoja mock-datan avulla. Käytössä staattiset mediatiedostot ja dynaaminen HTML-sivu Pugilla.

## API endpoints

### Media

- GET `/api/media` – kaikki media-items
- GET `/api/media/:id` – media-id:llä
- POST `/api/media` – lisää uusi media
- PUT `/api/media/:id` – päivitä media
- DELETE `/api/media/:id` – poista media

### Users

- GET `/api/user` – kaikki käyttäjät
- GET `/api/user/:id` – käyttäjä-id:llä
- POST `/api/user` – lisää käyttäjä
- PUT `/api/user/:id` – päivitä käyttäjä
- DELETE `/api/user/:id` – poista käyttäjä
