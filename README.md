# Løsningsforslag · Gem AMAbottens chathistorik i en JSON-fil

Løsningsforslag til [Øvelse 5: Gem AMAbottens chathistorik i en JSON-fil](https://github.com/cederdorff/wu-e26a/blob/main/opgaver/express-ejs-amabot-persistens.md) fra WU-E26A — bygger videre på [Øvelse 4](https://github.com/cederdorff/node-express-ejs-client-server-app/tree/solve-4-express-ejs-amabot-statistik). Alle tre opgavetekster ligger også i [`_exercises/`](_exercises/) i dette repo.

`messages` gemmes ikke længere i en variabel. `data/messages.json` er den eneste sandhed om samtalen: `GET /` og `POST /ask` læser og skriver filen direkte via `loadMessages()`/`saveMessages()`, hver gang de kører.

```text
GET /      -> loadMessages() -> fs.readFile() -> JSON.parse()                    -> EJS -> HTML

POST /ask  -> loadMessages() -> messages.push() -> saveMessages()
                                                  -> JSON.stringify() -> fs.writeFile()
```

## Kør projektet

```bash
npm install
npm run dev
```

Åbn <http://localhost:3000>.

## Tjekpunkt

- stadig kan svare, validere og score som i øvelse 3 og 4
- læser `data/messages.json` med `loadMessages()` i både `GET /` og `POST /ask`
- skriver den opdaterede historik med `saveMessages()` i `POST /ask`
- beholder samtalen efter en genstart af serveren
- har ingen `messages`-variabel uden for `loadMessages()`, `saveMessages()` og routes

## Projektstruktur

```text
express-ejs-amabot-persistens/
├── _exercises/
│   ├── express-ejs-amabot.md
│   ├── express-ejs-amabot-statistik.md
│   └── express-ejs-amabot-persistens.md
├── data/
│   └── messages.json
├── node_modules/
├── public/
│   └── styles.css
├── views/
│   └── index.ejs
├── package-lock.json
├── package.json
└── server.js
```
