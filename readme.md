# Back-end 2: Express-sovelluskehys - Suvi Mynttinen

Toteutettu backend Node.js/Expressillä, MVC-mallia ja MySQL-tietokantaa käyttäen.  
Sovellus tarjoaa media- ja käyttäjätietoja, tiedostojen latauksen, tykkäys-toiminnallisuuden, käyttäjäautentikoinnin, server-side validoinnin, virheenkäsittelyn sekä perustason parannuksia web-sovellusturvallisuuteen.

Käytetty: Node.js, Express, MySQL (mysql2), Multer, JWT, bcryptjs, helmet, express-validator, REST API ja VSCode REST Client.

## Database

Käytössä MySQL-tietokanta: MediaSharingApp

Taulut: Users, MediaItems, Comments, Likes, Ratings, Tags, MediaItemTags, UserLevels

Yhteys database.js-tiedoston kautta (mysql2/promise)

## Authentication

- POST `/api/auth/login` – kirjautuminen käyttäjätunnuksella ja salasanalla, palauttaa JWT-tokenin
  - Salasanat verrataan **bcrypt-hashiin** tietokannasta
- GET `/api/auth/me` – palauttaa kirjautuneen käyttäjän tiedot (JWT:n tarkistus req.user)

**Authorization rules**:

- Media- ja käyttäjätietojen päivitys/poisto sallitaan vain omistajalle.
- Admin (user_level_id === 2) voi muokata/poistaa kaikkia media- ja käyttäjätietoja.
- Tykkäysten lisääminen ja poistaminen sallittu vain kirjautuneelle käyttäjälle.

**Security enhancements**:

- **Helmet** käytössä: lisää ja konfiguroi HTTP-headerit suojaten sovellusta mm. XSS:ltä ja clickjackingilta.
- Salasanat hashataan **bcryptjs**:llä ennen tallennusta.
- Virheenkäsittely keskitetty `errorHandler`-middlewareen.

## Validation & error handling

- Käytössä **express-validator** kaikessa käyttäjän ja median tiedon luomisessa/päivittämisessä.
- Virheet käsitellään keskitetyn **error-handler-middleware** avulla (`errorHandler`), ei suoraan `res.status().json()` -kutsuilla.
- Validation errors ohjataan `validationErrors` middlewarelle, joka palauttaa selkeät virheviestit.

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
- POST `/api/user` – lisää käyttäjä (salasana hashataan bcryptillä)
- PUT `/api/user/:id` – päivitä käyttäjä (vain oma käyttäjä tai admin)
- DELETE `/api/user/:id` – poista käyttäjä (vain oma käyttäjä tai admin)

### Likes

- GET `/api/likes/media/:id` – listaa tykkäykset tietylle media-itemille
- GET `/api/likes/user/:id` – listaa käyttäjän tykkäykset
- POST `/api/likes` – lisää uusi tykkäys (user_id + media_id)
- DELETE `/api/likes/:id` – poistaa tykkäyksen

## Implementation Report

This backend implements a RESTful API with focus on authentication, authorization, validation, and security.

- **Authentication & Authorization:** JWT-based, passwords hashed with bcryptjs. Only owners or admins can modify resources.
- **Media Management:** File uploads via Multer, title/description validated using express-validator.
- **Likes System:** Users can like/unlike media items.
- **Security Enhancements:** Helmet for HTTP headers, centralized error handling, password hashing.
- **API Documentation:** Generated using apidoc, served at `/docs`.

## Screenshots

### POST /api/user

![Add new user]
