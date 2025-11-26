# Back-end 2: Express-sovelluskehys - Suvi Mynttinen

Toteutettu backend Node.js/Expressillä, MVC-mallia ja MySQL-tietokantaa käyttäen. Sovellus tarjoaa media- ja käyttäjätietoja, tiedostojen latauksen ja tykkäys-toiminnallisuuden.

Käytetty: Node.js, Express, MySQL (mysql2), Multer, REST API ja VSCode REST Client.

## Database

Käytössä MySQL-tietokanta: MediaSharingApp

Taulut: Users, MediaItems, Comments, Likes, Ratings, Tags, MediaItemTags, UserLevels

Yhteys database.js-tiedoston kautta (mysql2/promise)

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

### Likes

- GET `/api/likes/media/:id` – listaa tykkäykset tietylle media-itemille
- GET `/api/likes/user/:id` – listaa käyttäjän tykkäykset
- POST `/api/likes` – lisää uusi tykkäys (user_id + media_id)
- DELETE `/api/likes/:id` – poistaa tykkäyksen

<img width="1648" height="935" alt="image" src="https://github.com/user-attachments/assets/f758c335-c08f-4684-9869-b4dd1780a17c" />

<img width="1647" height="946" alt="image" src="https://github.com/user-attachments/assets/f5d37414-e120-4a49-b477-d59bbb8493f5" />


