# Back-end 2: Express-sovelluskehys - Suvi Mynttinen

Toteutettu backend Node.js/Expressillä, MVC-mallia ja MySQL-tietokantaa käyttäen.  
Sovellus tarjoaa media- ja käyttäjätietoja, tiedostojen latauksen, tykkäys-toiminnallisuuden ja käyttäjäautentikoinnin.

Käytetty: Node.js, Express, MySQL (mysql2), Multer, JWT, REST API ja VSCode REST Client.

## Database

Käytössä MySQL-tietokanta: MediaSharingApp

Taulut: Users, MediaItems, Comments, Likes, Ratings, Tags, MediaItemTags, UserLevels

Yhteys database.js-tiedoston kautta (mysql2/promise)

## Authentication

- POST `/api/auth/login` – kirjautuminen käyttäjätunnuksella ja salasanalla, palauttaa JWT-tokenin
- GET `/api/auth/me` – palauttaa kirjautuneen käyttäjän tiedot (JWT:n tarkistus req.user)

**Authorization rules**:

- Media- ja käyttäjätietojen päivitys/poisto sallitaan vain omistajalle.
- Admin (user_level_id === 2) voi muokata/poistaa kaikkia media- ja käyttäjätietoja.
- Tykkäysten lisääminen ja poistaminen sallittu vain kirjautuneelle käyttäjälle.

## API endpoints

### Media

- GET `/api/media` – kaikki media-items
- GET `/api/media/:id` – media-id:llä
- POST `/api/media` – lisää uusi media (Multer käytössä tiedoston lataamiseen)
- PUT `/api/media/:id` – päivitä media (vain omistaja tai admin)
- DELETE `/api/media/:id` – poista media (vain omistaja tai admin)

### Users

- GET `/api/user` – kaikki käyttäjät
- GET `/api/user/:id` – käyttäjä-id:llä
- POST `/api/user` – lisää käyttäjä
- PUT `/api/user/:id` – päivitä käyttäjä (vain oma käyttäjä tai admin)
- DELETE `/api/user/:id` – poista käyttäjä (vain oma käyttäjä tai admin)

### Likes

- GET `/api/likes/media/:id` – listaa tykkäykset tietylle media-itemille
- GET `/api/likes/user/:id` – listaa käyttäjän tykkäykset
- POST `/api/likes` – lisää uusi tykkäys (user_id + media_id)
- DELETE `/api/likes/:id` – poistaa tykkäyksen

## Screenshots
<img width="1645" height="946" alt="image" src="https://github.com/user-attachments/assets/abe7ea22-a6d2-44cf-b6d4-d60138a6c00c" />

