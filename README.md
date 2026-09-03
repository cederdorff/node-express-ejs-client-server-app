# Løsningsforslag · Formhåndtering, validering og svarlogik

Løsningsforslag til [Øvelse 2: Formhåndtering, validering og svarlogik](https://github.com/cederdorff/wu-e26a/blob/main/opgaver/express-ejs-formhaandtering-svarlogik.md) fra WU-E26A — bygger videre på [Øvelse 1](https://github.com/cederdorff/node-express-ejs-client-server-app/tree/solve-1-express-ejs-formular).

Serveren validerer navn og alder, viser en forståelig fejlbesked ved ugyldigt input, og gemmer gyldige navne i et array, som EJS renderer som en liste.

```text
Browser -> POST /submit -> request.body -> validering -> response.render() -> EJS -> HTML
```

## Kør projektet

```bash
npm install
npm run dev
```

Åbn <http://localhost:3000>.

## Tjekpunkt

- viser en fejl, hvis navnet mangler
- viser en fejl, hvis alder mangler eller ikke er et tal
- afviser decimaler og aldre uden for intervallet 1–120
- tilføjer et gyldigt navn til et array
- renderer både hilsen, fejlbesked og listen med EJS

## Projektstruktur

```text
express-ejs-formhaandtering-svarlogik/
├── node_modules/
├── views/
│   └── index.ejs
├── package-lock.json
├── package.json
└── server.js
```
