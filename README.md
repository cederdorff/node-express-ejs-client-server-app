# Løsningsforslag · Din første server-renderede EJS-app

Løsningsforslag til [Øvelse 1: Din første server-renderede EJS-app](https://github.com/cederdorff/wu-e26a/blob/main/opgaver/express-ejs-formular.md) fra WU-E26A.

En Express-server, der renderer en EJS-template. Formularen sender et navn til serveren via `POST /submit`, og serveren sender navnet tilbage til templaten, som viser en personlig hilsen.

```text
Browser -> GET / -> Express-route -> EJS -> HTML-response
Browser -> POST /submit -> express.urlencoded() -> request.body -> POST-route -> EJS -> ny HTML-response
```

## Kør projektet

```bash
npm install
npm run dev
```

Åbn <http://localhost:3000>.

## Tjekpunkt

- `GET /` renderer en EJS-template med en formular
- formularen sender et `POST`-request til den rigtige route
- `express.urlencoded()` gør formularens data tilgængelige i `request.body`
- serveren sender navnet til templaten, som viser en personlig hilsen
- både GET- og POST-requestet kan findes i Network-panelet

## Projektstruktur

```text
express-ejs-formular/
├── node_modules/
├── views/
│   └── index.ejs
├── package-lock.json
├── package.json
└── server.js
```
