# Løsningsforslag · Gør AMAbotten klogere med scoring og statistik

Løsningsforslag til [Øvelse 4: Gør AMAbotten klogere med scoring og statistik](https://github.com/cederdorff/wu-e26a/blob/main/opgaver/express-ejs-amabot-statistik.md) fra WU-E26A — bygger videre på [Øvelse 3](https://github.com/cederdorff/node-express-ejs-client-server-app/tree/solve-3-express-ejs-amabot). Begge opgavetekster ligger også i [`_exercises/`](_exercises/) i dette repo.

AMAbotten undersøger nu alle regler i stedet for at stoppe ved den første, der matcher. Den vælger reglen med flest matchende nøgleord (`findBestAnswer()`) og tæller, hvilke emner der bliver spurgt mest til (`topicStats`).

```text
spørgsmål -> findBestAnswer() -> svar og kategori -> POST-route -> EJS
                                           |
                                           -> topicStats
```

## Kør projektet

```bash
npm install
npm run dev
```

Åbn <http://localhost:3000>.

## Tjekpunkt

- stadig kan svare og validere som i øvelse 3
- undersøger alle regler
- tæller matchende nøgleord (`countMatches()`)
- vælger reglen med den højeste score (`findBestAnswer()`)
- returnerer både svar og kategori
- bruger et objekt (`topicStats`) som tæller
- vælger en property med bracket notation
- viser tællerne med EJS

## Projektstruktur

```text
express-ejs-amabot-statistik/
├── _exercises/
│   ├── express-ejs-amabot.md
│   └── express-ejs-amabot-statistik.md
├── node_modules/
├── public/
│   └── styles.css
├── views/
│   └── index.ejs
├── package-lock.json
├── package.json
└── server.js
```
