# Løsningsforslag · Server-renderet AMAbot med regelbaseret svarlogik

Løsningsforslag til [Øvelse 3: Server-renderet AMAbot med regelbaseret svarlogik](https://github.com/cederdorff/wu-e26a/blob/main/opgaver/express-ejs-amabot.md) fra WU-E26A (opgaveteksten ligger også som [`_exercises/express-ejs-amabot.md`](_exercises/express-ejs-amabot.md) i dette repo).

AMAbot betyder *Ask Me Anything-bot*. Den svarer på spørgsmål ud fra regler, arrays og objekter — ikke kunstig intelligens. Serveren modtager spørgsmålet, vælger et svar og lader EJS generere den næste HTML-side (server-side rendering).

```text
Browser -> POST /ask -> request.body.question -> validering -> findAnswer()
        -> messages array -> response.render() -> EJS -> HTML
```

## Kør projektet

```bash
npm install
npm run dev
```

Åbn <http://localhost:3000>.

## Tjekpunkt

- beholder et enkelt visuelt udtryk (styles.css)
- gør CSS tilgængelig fra `public/` med `express.static()`
- viser en formular og en samtalehistorik
- modtager et spørgsmål på `POST /ask`
- vælger et regelbaseret, personligt svar via `findAnswer()`
- afviser et tomt spørgsmål med en fejlbesked
- saniterer input (fjerner usynlige kontroltegn) adskilt fra validering og EJS' escaping

## Projektstruktur

```text
express-ejs-amabot/
├── _exercises/
│   └── express-ejs-amabot.md
├── node_modules/
├── public/
│   └── styles.css
├── views/
│   └── index.ejs
├── package-lock.json
├── package.json
└── server.js
```
