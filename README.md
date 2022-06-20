# CRUD API

## NPM Scripts
- `npm run test`  Run test cases for server app;
- `npm run start:dev`  Run server in development mode;
- `npm run start:prod`  Build server app and run in production mode;
---
## Endpoints
- **GET :**
    - `/api/users`  Get array of all available users;
    - `/api/users/${userId}`  Get an user by ID, where `userId` is an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) of existing user;
- **POST :**
    - `/api/users`  Create new user. Accepts the request body as `json` as data;
- **PUT :**
    - `/api/users/${userId}`  Update an existing user, where `userId` is an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) of existing user, with data from the request body as `json`;
- **DELETE :**
    - `/api/users/${userId}`  Delete an existing user, where `userId` is an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) of existing user.

---

## Models
- **USER:**
    - `id` : `<string>` - Generated UUID for an user **(Readonly)**;
    - `username` : `<string>` - Readable name of the user **(Required)**;
    - `age` : `<number>` - Number of full years of the user **(Required)**;
    - `hobbies` : `<string[]>` - Array of user's hobbies **(Required)**;
---
