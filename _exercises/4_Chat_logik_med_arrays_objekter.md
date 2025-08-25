# 4. Chat logik med arrays & objekter

Denne guide bygger videre på [3_Chatbot_med_Express_og_EJS.md](3_Chatbot_med_Express_og_EJS.md) og udvider din chatbot med avanceret chatlogik, strukturering af svar, randomisering, historik og brugerdefinerede svar.

---

## Øvelse 1: Svar-database med arrays og objekter

**Målsætning:** I denne øvelse lærer du at organisere chatbot-svar i en struktureret database, så botten kan svare intelligent på forskellige beskeder.

**Baggrund:** En smart chatbot har brug for at kunne matche brugerens beskeder med passende svar. I stedet for at have al logik i if/else statements, bruger vi en database-struktur med arrays og objekter.

**Bemærk:** Hvis du allerede har oprettet et responses-array med keywords og svar i din chatbot (se [3_Chatbot_med_Express_og_EJS.md](3_Chatbot_med_Express_og_EJS.md)), kan du bruge denne øvelse som opsummering og reference. Formålet er at sikre, at alle forstår strukturen og kan udvide den med flere svar og logik. Gå gerne direkte videre til de mere avancerede øvelser, hvis du har styr på grundstrukturen!

**Detaljeret step guide:**

1. **Planlægning:** Tænk over hvilke typer beskeder din chatbot skal kunne håndtere

   - Hilsner (hej, hallo, god dag)
   - Afskeder (farvel, bye, vi ses)
   - Spørgsmål (hvordan har du det, hvad laver du)
   - Komplimenter (du er sød, tak for hjælpen)

2. **Strukturdesign:** Beslut dig for strukturen af dit svar-objekt

   - Hvert objekt skal have `keywords` (array af ord der trigger svaret)
   - Hvert objekt skal have `answers` (array af mulige svar)
   - Overvej om du vil tilføje kategorier eller andre metadata

3. **Implementation:** Opret responses-arrayet øverst i din `server.js`

   - Placer det efter dine require-statements men før dine routes
   - Start med 2-3 simple eksempler
   - Test at strukturen virker før du tilføjer flere

4. **Integration:** Udvid din POST-route til at bruge responses-arrayet
   - Find den eksisterende POST-route (fx `/chat`)
   - Erstat den simple if/else logik med søgning i responses
   - Sørg for at gemme både brugerens besked og bot-svaret i messages

**Hjælpende tips:**

- Start enkelt! Du kan altid udvide med flere svar senere
- Brug danske ord som keywords, men overvej også engelske alternativer
- Tænk på variations af ord (hej/hallo, farvel/ha' det)

<details>
  <summary>Vis komplet kodeeksempel</summary>

```js
// Placer øverst i server.js, efter require-statements
const responses = [
  {
    keywords: ["hej", "hello", "hallo", "god dag"],
    answers: [
      "Hej! Hyggelig at møde dig!",
      "Hello there!",
      "Hej, hvordan har du det?"
    ]
  },
  {
    keywords: ["farvel", "bye", "ha det", "vi ses"],
    answers: ["Farvel! Det var hyggeligt!", "Bye bye!", "Vi ses snart!"]
  }
];
```

</details>

---

## Øvelse 2: String-metoder og pattern matching

**Målsætning:** Lær at håndtere forskellige skrivemåder og gøre din chatbot mere fleksibel med string-metoder.

**Baggrund:** Brugere skriver ikke altid på samme måde - nogle bruger store bogstaver, andre små. Din chatbot skal kunne forstå "HEJ", "hej" og "Hej" som det samme ord.

**Detaljeret step guide:**

1. **Forberedelse:** Forstå problemet med case-sensitivity

   - Test hvad der sker hvis en bruger skriver "HEJ" i stedet for "hej"
   - Bemærk at JavaScript skelner mellem store og små bogstaver
   - Løsningen er at konvertere alt til samme case

2. **Implementation af toLowerCase():**

   - Find din POST-route hvor du modtager brugerens besked
   - Gem brugerens besked i en variabel og konverter til små bogstaver
   - Dette sikrer konsistent sammenligning uanset hvordan brugeren skriver

3. **Pattern matching med .includes():**

   - Brug `.includes()` til at tjekke om brugerens besked indeholder et keyword
   - Dette er mere fleksibelt end eksakt match - "hej alle sammen" matcher stadig "hej"
   - Kombiner med `.some()` til at tjekke mod flere keywords ad gangen

4. **Loop gennem responses:**

   - Brug `forEach()` eller `for...of` til at gennemgå alle response-objekter
   - For hvert objekt: tjek om nogen af keywords matcher brugerens besked
   - Stop når du finder et match og brug det tilhørende svar

5. **Fallback-svar:**
   - Definer et standard-svar hvis ingen keywords matcher
   - Dette sikrer at botten altid svarer noget
   - Eksempler: "Jeg forstod ikke din besked", "Kan du prøve at spørge på en anden måde?"

**Hjælpende tips:**

- Test med forskellige kombinationer: "HEJ", "hej der", "Hej alle sammen"
- Overvej om du vil tillade partial matches - "farvel alle" matcher "farvel"
- Debug ved at console.log() brugerens besked før og efter toLowerCase()

<details>
  <summary>Vis komplet kodehint</summary>

```js
app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();
  let botReply =
    "Jeg forstod ikke din besked. Prøv at spørge på en anden måde.";

  // Gennemgå alle response-objekter
  responses.forEach(resp => {
    // Tjek om nogen keywords matcher brugerens besked
    if (resp.keywords.some(keyword => userMessage.includes(keyword))) {
      // Vælg første svar (senere kan vi randomisere)
      botReply = resp.answers[0];
    }
  });

  // Gem beskeder og redirect
  messages.push({ sender: "Bruger", text: req.body.message });
  messages.push({ sender: "Bot", text: botReply });
  res.redirect("/");
});
```

</details>

---

## Øvelse 3: Intelligent svarudvælgelse med if/else og switch

**Målsætning:** Lær at skabe mere sofistikeret chatbot-logik med conditions og forskellige svarstrategier.

**Baggrund:** Nogle gange vil du have mere kontrol over hvornår botten svarer hvad. Måske skal botten reagere forskelligt på "tak" vs "mange tak", eller have specielle svar til bestemte situationer.

**Detaljeret step guide:**

1. **Analysér dine behov:**

   - Identificer beskeder der kræver særlig behandling
   - Eksempler: Høflighedsfraser, følelsesudtryk, spørgsmål vs statements
   - Beslut hvilke beskeder der skal have prioritet over andre

2. **Implementér specifik logik før generel søgning:**

   - Tjek for specifikke fraser FØRST (fx "hvordan går det")
   - Brug eksakte matches for vigtige beskeder
   - Falder tilbage til keyword-søgning hvis ingen specifikke matches

3. **Brug if/else chains:**

   - Start med de mest specifikke cases
   - Arbejd dig ned til mere generelle
   - Slut med fallback til keyword-søgning

4. **Alternativt: Switch statements:**

   - Godt til mange simple, eksakte matches
   - Mere læsbart end lange if/else chains
   - Husk break; statements!

5. **Kombiner strategier:**
   - Brug if/else for komplekse conditions
   - Brug keyword-søgning for generelle svar
   - Prioritér altid den mest specifikke match

**Hjælpende tips:**

- Rækkefølgen af checks er vigtig - mest specifikke først!
- Test edge cases som "tak for ingenting" vs bare "tak"
- Overvej om du vil have forskellige svar til "Hej" vs "Hej bot"

<details>
  <summary>Vis komplet kodehint med prioriteret logik</summary>

```js
app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();
  let botReply = "Jeg forstod ikke din besked.";

  // Specifik logik FØRST - højeste prioritet
  if (
    userMessage.includes("hvordan går det") ||
    userMessage.includes("hvordan har du det")
  ) {
    botReply = "Jeg har det fint, tak for at spørge! Hvordan har du det?";
  } else if (userMessage.includes("tak") && userMessage.includes("hjælp")) {
    botReply = "Det var så lidt! Jeg er her for at hjælpe.";
  } else if (userMessage.includes("tak")) {
    botReply = "Velbekomme! 😊";
  } else if (
    userMessage.includes("undskyld") ||
    userMessage.includes("beklager")
  ) {
    botReply = "Det er helt i orden, ingen problem!";
  } else {
    // Generel keyword-søgning som fallback
    responses.forEach(resp => {
      if (resp.keywords.some(keyword => userMessage.includes(keyword))) {
        botReply = resp.answers[0];
      }
    });
  }

  // Gem beskeder og redirect
  messages.push({ sender: "Bruger", text: req.body.message });
  messages.push({ sender: "Bot", text: botReply });
  res.redirect("/");
});
```

</details>

<details>
  <summary>Alternativ med switch statement</summary>

```js
// Eksempel med switch for enkle, eksakte matches
const exactMessage = userMessage.trim();
switch (exactMessage) {
  case "hej":
    botReply = "Hej! Hvordan kan jeg hjælpe dig?";
    break;
  case "tak":
    botReply = "Velbekomme!";
    break;
  case "farvel":
    botReply = "Ha' det godt!";
    break;
  default:
  // Falder tilbage til keyword-søgning
  // ...keyword logic her...
}
```

</details>

---

## Øvelse 4: Tilfældig svargenerering med Math.random()

**Målsætning:** Gør din chatbot mere naturlig og varieret ved at randomisere svarene, så den ikke altid siger det samme.

**Baggrund:** Rigtige mennesker svarer ikke altid på nøjagtig samme måde. Ved at randomisere svar virker din chatbot mere levende og mindre robotagtig.

**Detaljeret step guide:**

1. **Forstå Math.random():**

   - `Math.random()` returnerer et tal mellem 0 og 1 (ikke inklusive 1)
   - `Math.random() * 3` giver tal mellem 0 og 3
   - `Math.floor(Math.random() * 3)` giver hele tal: 0, 1, eller 2
   - Dette svarer til array indices hvis du har 3 elementer!

2. **Implementér random array selection:**

   - Find stedet hvor du vælger svar fra `resp.answers`
   - Erstat `resp.answers[0]` med random selection
   - Brug array.length til at gøre det dynamisk

3. **Test randomiseringen:**

   - Send samme besked flere gange til botten
   - Verificer at du får forskellige svar
   - Tjek at alle svar i arrayet bliver brugt

4. **Udvid med flere svar:**

   - Tilføj flere svar til dine eksisterende response-objekter
   - Jo flere svar, jo mere varieret bliver botten
   - Sørg for at alle svar er passende til samme keyword

5. **Debug tips:**
   - Log det valgte index: `console.log("Valgte svar index:", randomIndex)`
   - Log det valgte svar: `console.log("Bot svarer:", selectedAnswer)`
   - Verificer at indices ikke går uden for array bounds

**Hjælpende tips:**

- Start med 2-3 svar per keyword og udvid gradvist
- Sørg for at alle svar i et array passer til samme situation
- Test med mange beskeder for at sikre god fordeling
- Overvej om nogle svar skal være mere almindelige end andre

<details>
  <summary>Vis detaljeret randomizing kode</summary>

```js
// I din POST route, når du har fundet et match:
responses.forEach(resp => {
  if (resp.keywords.some(keyword => userMessage.includes(keyword))) {
    // Generer random index mellem 0 og antal svar-1
    const randomIndex = Math.floor(Math.random() * resp.answers.length);

    // Vælg svar baseret på random index
    botReply = resp.answers[randomIndex];

    // Debug (fjern i produktion):
    console.log(`Valgte svar ${randomIndex + 1} ud af ${resp.answers.length}`);
  }
});
```

</details>

<details>
  <summary>Eksempel med udvidede svar-arrays</summary>

```js
const responses = [
  {
    keywords: ["hej", "hello", "hallo"],
    answers: [
      "Hej! Hvordan har du det?",
      "Hello! Dejligt at møde dig!",
      "Hej der! Hvad kan jeg hjælpe med?",
      "Hallo! Hvordan går det?",
      "Hej! Velkommen til chatten!"
    ]
  },
  {
    keywords: ["tak", "mange tak"],
    answers: [
      "Velbekomme! 😊",
      "Det var så lidt!",
      "Bare rolig!",
      "Det glæder mig at jeg kunne hjælpe!",
      "Selv tak!"
    ]
  }
];
```

</details>

---

## Øvelse 5: Udvid chatbotten med flere kategorier og randomisering

**Målsætning:** Byg en robust chatbot med mange forskellige samtaleemner og naturlige, varierede svar.

**Baggrund:** En god chatbot kan håndtere mange forskellige typer samtaler. I denne øvelse skal du udvide din bot til at kunne tale om mad, vejr, hobbyer, følelser og meget mere.

**Detaljeret step guide:**

1. **Brainstorm kategorier:**

   - Mad og drikke (pizza, kaffe, is, etc.)
   - Vejr og årstider (sol, regn, sne, varmt, koldt)
   - Følelser (glad, trist, træt, energisk)
   - Hobbyer (læse, spille, løbe, se film)
   - Tid og datoer (morgen, aften, weekend, ferie)
   - Complimenter og ros
   - Spørgsmål om botten selv

2. **Design responses struktur:**

   - Hver kategori skal have mange keywords
   - Hver kategori skal have varierede, passende svar
   - Overvej synonymer og alternative ord
   - Tænk på hvordan folk faktisk snakker

3. **Implementér systematisk:**

   - Tilføj én kategori ad gangen
   - Test hver kategori grundigt før du går videre
   - Sørg for at keywords ikke overlapper på forvirrende måder

4. **Test og forbedring:**

   - Prøv at skrive som forskellige typer brugere
   - Test med stavefejl og slang
   - Justér keywords og svar baseret på test-resultater

5. **Overvej context og flow:**
   - Nogle svar kan lede til opfølgende spørgsmål
   - Botten kan stille spørgsmål tilbage til brugeren
   - Overvej hvordan samtaler naturligt udvikler sig

**Hjælpende tips:**

- Begynd med emner du selv kender godt
- Lav svar der inviterer til mere samtale
- Undgå kontroversielle emner i starten
- Test med venner og familie for feedback

<details>
  <summary>Vis omfattende eksempel med mange kategorier</summary>

```js
const responses = [
  // Hilsner og høflighed
  {
    keywords: ["hej", "hello", "hallo", "goddag", "hey"],
    answers: [
      "Hej! Hvordan har du det i dag?",
      "Hello! Dejligt at møde dig!",
      "Hej der! Hvad kan jeg hjælpe med?",
      "Hallo! Hvordan går det?",
      "Hey! Velkommen til chatten!"
    ]
  },

  // Mad og drikke
  {
    keywords: ["mad", "spise", "sultne", "pizza", "burger", "is"],
    answers: [
      "Mmm, jeg elsker at snakke om mad! Hvad er din yndlingsmad?",
      "Mad er fantastisk! Jeg drømmer om pizza og is 🍕🍦",
      "Er du sulten? Jeg ved desværre ikke hvor nærmeste restaurant er!",
      "Hvad spiser du helst? Jeg er ret nysgerrig!",
      "Mad bringer folk sammen. Hvad laver du helst i køkkenet?"
    ]
  },

  // Vejr og årstider
  {
    keywords: [
      "vejr",
      "sol",
      "regn",
      "sne",
      "varmt",
      "koldt",
      "vinter",
      "sommer"
    ],
    answers: [
      "Vejret påvirker virkelig humøret, synes du ikke?",
      "Jeg kan ikke mærke vejret, men jeg håber det er dejligt derude!",
      "Uanset vejret, så er det altid godt vejr til at chatte! ☀️🌧️",
      "Fortæl mig om vejret - jeg lever gennem dine beskrivelser!",
      "Vejr er et evigt samtaleemne. Hvad foretrækker du?"
    ]
  },

  // Følelser og humør
  {
    keywords: ["glad", "trist", "træt", "energisk", "kedelig", "spændende"],
    answers: [
      "Følelser er vigtige! Hvordan har du det lige nu?",
      "Det lyder som du har en følelsesfuld dag. Vil du fortælle mere?",
      "Jeg prøver altid at være optimistisk! Hvad gør dig glad?",
      "Tak for at dele dine følelser med mig. Det betyder meget!",
      "Følelser kommer og går - det er helt naturligt! 💚"
    ]
  },

  // Hobbyer og interesser
  {
    keywords: ["hobby", "læse", "bog", "musik", "spille", "sport", "film"],
    answers: [
      "Hobbyer gør livet sjovere! Hvad er du passioneret omkring?",
      "Jeg elsker at høre om folks interesser. Fortæl mig mere!",
      "Det lyder interessant! Hvor længe har du været interesseret i det?",
      "Hobbyer er en god måde at slappe af på. Hvad anbefaler du?",
      "Jeg ønsker jeg kunne prøve forskellige hobbyer! Beskriv din favorit."
    ]
  },

  // Tak og høflighed
  {
    keywords: ["tak", "mange tak", "tusind tak"],
    answers: [
      "Velbekomme! Det glæder mig at jeg kunne hjælpe! 😊",
      "Det var så lidt! Jeg er her for dig!",
      "Selv tak for den hyggelige samtale!",
      "Åh, det var ikke noget! Kom endelig igen!",
      "Tak for takken! Du er også sød! 💙"
    ]
  }
];
```

</details>

<details>
  <summary>Tips til at teste mange kategorier</summary>

```js
// Test-beskeder du kan prøve:
const testMessages = [
  "Hej bot, hvordan har du det?",
  "Jeg er sulten og vil gerne have pizza",
  "Vejret er så dårligt i dag",
  "Jeg er så glad i dag!",
  "Hvad er din hobby?",
  "Tak for hjælpen",
  "Jeg kan godt lide at læse bøger",
  "Det regner og jeg er træt"
];

// Test ved at sende disse beskeder og se om botten svarer relevant
```

</details>

---

## Øvelse 6: Chatbot med brugerdefinerede svar

**Målsætning:** Lad brugerne selv tilføje nye keywords og svar til din chatbot, så den kan lære og tilpasse sig.

**Baggrund:** En chatbot bliver mere nyttig hvis brugerne kan lære den nye ting. Dette gør også botten personlig og tilpasset den specifikke brugergruppe.

**Detaljeret step guide:**

1. **Design brugergrænsefladen:**

   - Tilføj en sektion i din EJS-template til "Lær botten noget nyt"
   - Lav input-felter for keyword og svar
   - Tilføj en form med POST-action til en ny route
   - Overvej at placere det i en separat sektion eller på en egen side

2. **Opret HTML-formen:**

   ```html
   <section class="teach-bot">
     <h3>Lær botten noget nyt</h3>
     <form method="POST" action="/add-response">
       <input
         type="text"
         name="keyword"
         placeholder="Nøgleord (fx 'kage')"
         required />
       <input
         type="text"
         name="answer"
         placeholder="Svar (fx 'Jeg elsker chokoladekage!')"
         required />
       <button type="submit">Tilføj svar</button>
     </form>
   </section>
   ```

3. **Implementér backend-logikken:**

   - Opret en ny POST-route `/add-response`
   - Modtag keyword og answer fra req.body
   - Valider input (ikke tomme strenge, rimelig længde)
   - Tilføj til responses-arrayet eller opdater eksisterende

4. **Håndter validering og fejl:**

   - Tjek om keyword allerede eksisterer
   - Beslut om du vil tilføje til eksisterende eller erstatte
   - Giv feedback til brugeren om status
   - Omdirigér tilbage til chat-siden

5. **Udvid med avancerede features:**
   - Mulighed for at tilføje flere keywords til samme svar
   - Mulighed for at se alle lærte svar
   - Admin-funktioner til at slette eller redigere svar
   - Validering af upassende indhold

**Hjælpende tips:**

- Start simpelt - ét keyword, ét svar
- Test med både nye keywords og eksisterende
- Overvej at gemme lærte svar i en separat array
- Sørg for at validerinput for at undgå tomme eller farlige data

<details>
  <summary>Vis komplet HTML-form til EJS-template</summary>

```html
<!-- Tilføj denne sektion til din index.ejs -->
<div class="teach-section">
  <h3>🎓 Lær botten noget nyt</h3>
  <p>Hjælp botten med at lære nye ord og svar!</p>

  <form method="POST" action="/add-response" class="teach-form">
    <div class="form-group">
      <label for="keyword">Nøgleord:</label>
      <input
        type="text"
        id="keyword"
        name="keyword"
        placeholder="fx 'kage' eller 'computere'"
        required
        maxlength="50" />
      <small>Ordet som skal trigger svaret</small>
    </div>

    <div class="form-group">
      <label for="answer">Svar:</label>
      <input
        type="text"
        id="answer"
        name="answer"
        placeholder="fx 'Jeg elsker chokoladekage!' eller 'Computere er fascinerende!'"
        required
        maxlength="200" />
      <small>Hvad botten skal svare når ordet bruges</small>
    </div>

    <button type="submit" class="btn-primary">➕ Tilføj nyt svar</button>
  </form>
</div>
```

</details>

<details>
  <summary>Vis komplet backend-implementation</summary>

```js
// Tilføj denne route til din server.js
app.post("/add-response", (req, res) => {
  const { keyword, answer } = req.body;

  // Validering af input
  if (!keyword || !answer) {
    console.log("Fejl: Keyword eller answer mangler");
    return res.redirect("/?error=missing_fields");
  }

  if (keyword.trim().length === 0 || answer.trim().length === 0) {
    console.log("Fejl: Tomme felter");
    return res.redirect("/?error=empty_fields");
  }

  // Rens input
  const cleanKeyword = keyword.trim().toLowerCase();
  const cleanAnswer = answer.trim();

  // Tjek om keyword allerede eksisterer
  const existingResponse = responses.find(resp =>
    resp.keywords.some(kw => kw === cleanKeyword)
  );

  if (existingResponse) {
    // Tilføj til eksisterende svar
    existingResponse.answers.push(cleanAnswer);
    console.log(`Tilføjet nyt svar til eksisterende keyword: ${cleanKeyword}`);
  } else {
    // Opret nyt response-objekt
    responses.push({
      keywords: [cleanKeyword],
      answers: [cleanAnswer]
    });
    console.log(`Oprettet nyt keyword: ${cleanKeyword}`);
  }

  // Gem bruger-lært response separat (valgfrit)
  if (!global.userLearnedResponses) {
    global.userLearnedResponses = [];
  }
  global.userLearnedResponses.push({
    keyword: cleanKeyword,
    answer: cleanAnswer,
    timestamp: new Date()
  });

  // Redirect tilbage med success
  res.redirect("/?success=response_added");
});
```

</details>

<details>
  <summary>Vis CSS til styling af formularen</summary>

```css
/* Tilføj til din style.css */
.teach-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 4px solid #007bff;
}

.teach-form .form-group {
  margin-bottom: 15px;
}

.teach-form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.teach-form input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.teach-form small {
  display: block;
  color: #666;
  font-size: 12px;
  margin-top: 3px;
}

.btn-primary {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary:hover {
  background: #0056b3;
}
```

</details>

---

## Øvelse 7: Chatbot med historik og timestamp

**Målsætning:** Tilføj tidsstempler til chat-beskeder så brugerne kan se hvornår hver besked blev sendt.

**Baggrund:** I rigtige chat-applikationer er det vigtigt at vide hvornår beskeder blev sendt. Dette hjælper med at følge samtaleflow og giver kontext til beskeder.

**Detaljeret step guide:**

1. **Forstå JavaScript Date-objekter:**

   - `new Date()` opretter et objekt med nuværende tid
   - `.toLocaleTimeString()` formaterer kun tiden (fx "14:35:22")
   - `.toLocaleDateString()` formaterer kun datoen (fx "24/8/2025")
   - `.toLocaleString()` formaterer både dato og tid

2. **Modificér message-struktur:**

   - I stedet for bare strings, gem beskeder som objekter
   - Hvert beskedobjekt skal have: sender, text, og time
   - Opdater både bruger- og bot-beskeder

3. **Implementér timestamp-tilføjelse:**

   - Når du gemmer brugerens besked: tilføj timestamp
   - Når du gemmer bot-svaret: tilføj timestamp
   - Brug samme format for konsistens

4. **Opdater EJS-template:**

   - Modificér din loop der viser beskeder
   - Vis time-propertien sammen med besked
   - Style tiden så den er diskret men synlig

5. **Test og forbedring:**
   - Send flere beskeder og verificer timestamps
   - Tjek at rækkefølgen er korrekt
   - Overvej forskellige visningsformater

**Hjælpende tips:**

- Danske locale-indstillinger: `toLocaleString('da-DK')`
- Overvej at vise kun tid på samme dag, og dato+tid for ældre beskeder
- Test hvordan det ser ud med mange beskeder
- Overvej at gøre timestamp-formatet konfigurerbart

<details>
  <summary>Vis komplet implementation af timestamp-system</summary>

```js
// I din POST-route hvor du gemmer beskeder:
app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();
  let botReply = "Jeg forstod ikke din besked.";

  // ... din chatbot-logik her ...

  // Gem brugerens besked med timestamp
  messages.push({
    sender: "Bruger",
    text: req.body.message, // Original besked (ikke lowercase)
    time: new Date().toLocaleString("da-DK"),
    timestamp: new Date() // Gem også raw timestamp til sortering
  });

  // Gem bot-svaret med timestamp
  messages.push({
    sender: "Bot",
    text: botReply,
    time: new Date().toLocaleString("da-DK"),
    timestamp: new Date()
  });

  res.redirect("/");
});
```

</details>

<details>
  <summary>Vis EJS-template med timestamp-visning</summary>

```html
<!-- I din index.ejs, erstatt den simple besked-loop med: -->
<div class="chat-messages">
  <% messages.forEach(function(msg) { %>
  <div class="message <%= msg.sender.toLowerCase() %>">
    <div class="message-header">
      <strong class="sender"><%= msg.sender %>:</strong>
      <span class="timestamp"><%= msg.time %></span>
    </div>
    <div class="message-text"><%= msg.text %></div>
  </div>
  <% }); %>
</div>
```

</details>

<details>
  <summary>Vis CSS til styling af timestamps</summary>

```css
/* Tilføj til din style.css */
.message {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  border-left: 3px solid #ddd;
}

.message.bruger {
  background: #e3f2fd;
  border-left-color: #2196f3;
  margin-left: 20px;
}

.message.bot {
  background: #f3e5f5;
  border-left-color: #9c27b0;
  margin-right: 20px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.sender {
  color: #333;
  font-size: 14px;
}

.timestamp {
  color: #666;
  font-size: 12px;
  font-style: italic;
}

.message-text {
  color: #555;
  line-height: 1.4;
}
```

</details>

<details>
  <summary>Avanceret: Relativ tid-visning</summary>

```js
// Funktion til at vise relativ tid (fx "2 minutter siden")
function getRelativeTime(timestamp) {
  const now = new Date();
  const diffMs = now - new Date(timestamp);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMinutes < 1) return "lige nu";
  if (diffMinutes < 60) return `${diffMinutes} min siden`;
  if (diffHours < 24) return `${diffHours} timer siden`;
  return new Date(timestamp).toLocaleDateString("da-DK");
}

// Brug i EJS med en helper-funktion eller send processed data
```

</details>

---

## Øvelse 8: Chatbot med kategorier

**Målsætning:** Organiser chatbot-svar i kategorier for bedre struktur og mulighed for intelligent routing af beskeder.

**Baggrund:** Kategorier hjælper med at organisere chatbot-logik og gør det muligt at implementere avancerede features som kontekst-afhængige svar, statistik og specialiserede chat-modes.

**Detaljeret step guide:**

1. **Design kategori-system:**

   - Brainstorm mulige kategorier: "hilsen", "afskeder", "følelser", "mad", "vejr", "spørgsmål", "komplimenter"
   - Beslut om kategorier skal være hierarkiske (underkategorier)
   - Overvej om én besked kan tilhøre flere kategorier

2. **Udvid response-struktur:**

   - Tilføj `category` property til hvert response-objekt
   - Gruppér eksisterende responses i logiske kategorier
   - Sørg for at alle responses har en kategori

3. **Implementér kategori-baseret logik:**

   - Kan bruges til at prioritere bestemte typer svar
   - Mulighed for at tracke hvilke kategorier der bruges mest
   - Specialbehandling af bestemte kategorier

4. **Vis kategorier til brugeren:**

   - Overvej om kategorier skal være synlige for brugeren
   - Mulighed for kategori-tags eller farver
   - Hjælp-funktionalitet der viser tilgængelige kategorier

5. **Avancerede category-features:**
   - Context-switching baseret på kategori
   - Kategori-specifik formatering af svar
   - Statistik over kategori-brug

**Hjælpende tips:**

- Start med 4-6 grundkategorier
- Lav en "misc" eller "andet" kategori til edge cases
- Test at kategorier giver mening for brugerne
- Overvej om kategorier skal påvirke chatbot-personlighed

<details>
  <summary>Vis komplet kategori-struktur</summary>

```js
const responses = [
  {
    category: "hilsen",
    keywords: ["hej", "hello", "hallo", "goddag"],
    answers: [
      "Hej! Hvordan har du det?",
      "Hello! Dejligt at møde dig!",
      "Hej der! Hvad kan jeg hjælpe med?"
    ]
  },
  {
    category: "afskeder",
    keywords: ["farvel", "bye", "ha det", "vi ses"],
    answers: [
      "Farvel! Det var hyggeligt at snakke!",
      "Ha' det godt! Vi ses snart!",
      "Bye bye! Kom igen snart!"
    ]
  },
  {
    category: "følelser",
    keywords: ["glad", "trist", "sur", "lykkelig", "ked af det"],
    answers: [
      "Det er godt at dele sine følelser! Hvordan har du det?",
      "Følelser er vigtige. Vil du fortælle mere?",
      "Jeg håber du får en bedre dag! 💙"
    ]
  },
  {
    category: "mad",
    keywords: ["mad", "spise", "sultne", "pizza", "kage"],
    answers: [
      "Mad er fantastisk! Hvad er din yndlingsmad?",
      "Jeg drømmer om alle de lækre retter der eksisterer! 🍕",
      "Fortæl mig om din yndlingsret!"
    ]
  },
  {
    category: "spørgsmål",
    keywords: ["hvad", "hvorfor", "hvordan", "hvornår", "hvor"],
    answers: [
      "Det er et godt spørgsmål! Lad mig tænke over det.",
      "Spørgsmål er vejen til viden! Hvad vil du vide?",
      "Jeg gør mit bedste for at svare på alt! 🤔"
    ]
  },
  {
    category: "komplimenter",
    keywords: ["sød", "smart", "god", "fantastisk", "awesome"],
    answers: [
      "Åh tak! Du er også meget sød! 😊",
      "Det varmer mit digitale hjerte! Tak!",
      "Du gør mig glad! Tak for de søde ord! 💚"
    ]
  }
];
```

</details>

<details>
  <summary>Vis kategori-baseret chatlogik</summary>

```js
app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();
  let botReply = "Jeg forstod ikke din besked.";
  let matchedCategory = "ukategoriseret";

  // Find match og gem kategori
  responses.forEach(resp => {
    if (resp.keywords.some(keyword => userMessage.includes(keyword))) {
      const randomIndex = Math.floor(Math.random() * resp.answers.length);
      botReply = resp.answers[randomIndex];
      matchedCategory = resp.category;
    }
  });

  // Special logik baseret på kategori
  if (matchedCategory === "følelser") {
    botReply += " Vil du fortælle mig mere om hvordan du har det?";
  } else if (matchedCategory === "spørgsmål") {
    botReply += " Spørg endelig igen hvis du vil vide mere!";
  }

  // Gem beskeder med kategori-info
  messages.push({
    sender: "Bruger",
    text: req.body.message,
    time: new Date().toLocaleString("da-DK"),
    category: "bruger-input"
  });

  messages.push({
    sender: "Bot",
    text: botReply,
    time: new Date().toLocaleString("da-DK"),
    category: matchedCategory
  });

  res.redirect("/");
});
```

</details>

<details>
  <summary>Vis kategori-visning i EJS</summary>

```html
<!-- Vis kategorier i beskeder -->
<div class="chat-messages">
  <% messages.forEach(function(msg) { %>
  <div
    class="message <%= msg.sender.toLowerCase() %> category-<%= msg.category %>">
    <div class="message-header">
      <strong class="sender"><%= msg.sender %>:</strong>
      <span class="category-tag"><%= msg.category %></span>
      <span class="timestamp"><%= msg.time %></span>
    </div>
    <div class="message-text"><%= msg.text %></div>
  </div>
  <% }); %>
</div>

<!-- Vis tilgængelige kategorier som hjælp -->
<div class="category-help">
  <h4>💡 Jeg kan snakke om:</h4>
  <div class="category-tags">
    <span class="tag hilsen">Hilsner</span>
    <span class="tag mad">Mad & drikke</span>
    <span class="tag følelser">Følelser</span>
    <span class="tag spørgsmål">Spørgsmål</span>
    <span class="tag komplimenter">Komplimenter</span>
  </div>
</div>
```

</details>

<details>
  <summary>Vis kategori-statistik</summary>

```js
// Tilføj statistik-route
app.get("/stats", (req, res) => {
  // Tæl beskeder per kategori
  const categoryStats = {};
  messages.forEach(msg => {
    if (msg.category && msg.sender === "Bot") {
      categoryStats[msg.category] = (categoryStats[msg.category] || 0) + 1;
    }
  });

  res.render("stats", { categoryStats, messages });
});

// I EJS kan du vise statistik
// Mest populære kategori: <%= Object.keys(categoryStats).sort((a,b) => categoryStats[b] - categoryStats[a])[0] %>
```

</details>

---

## Øvelse 9: Chatbot med begrænsning på antal beskeder

**Step guide:**

1. Når du tilføjer en besked til `messages`, tjek længden og fjern den ældste hvis der er for mange.
2. Test at kun de seneste beskeder vises.

<details>
  <summary>Vis kodehint</summary>

```js
if (messages.length > 10) messages.shift();
```

</details>

---

## Øvelse 10: Chatbot med feedback og statistik

**Step guide:**

1. Tilføj en tæller for antal beskeder og vis den i din EJS-template.
2. Udvid med statistik, fx hvor mange beskeder brugeren har sendt vs. botten.

<details>
  <summary>Vis kodehint</summary>

```js
const totalMessages = messages.length;
const userCount = messages.filter(msg => msg.sender === "Bruger").length;
const botCount = messages.filter(msg => msg.sender === "Bot").length;
```

```html
<p>Antal beskeder i chatten: <%= totalMessages %></p>
<p>Brugerbeskeder: <%= userCount %> | Botbeskeder: <%= botCount %></p>
```

</details>

---

## Øvelse 11: Chatbot med reset/clear funktion

**Step guide:**

1. Tilføj en "Ryd chat"-knap i din EJS-template.
2. Tilføj en POST-route i `server.js` der tømmer besked-arrayet og redirecter til forsiden.

<details>
  <summary>Vis kodehint</summary>

```html
<form method="POST" action="/clear">
  <button type="submit">Ryd chat</button>
</form>
```

```js
app.post("/clear", (req, res) => {
  messages.length = 0;
  res.redirect("/");
});
```

</details>

---

## Øvelse 12: Chatbot med emojis og avanceret svar

**Step guide:**

1. Tilføj emojis til dine svar i `responses`.
2. Udvid svarlogikken, så botten kan reagere på flere følelser og stemninger.

<details>
  <summary>Vis kodehint</summary>

```js
{ keywords: ["glad"], answers: ["Jeg er glad 😃", "Det er en god dag! ☀️"] }
```

</details>

---

## Øvelse 13: Chatbot med session og brugeridentifikation

**Step guide:**

1. Tilføj et inputfelt for brugernavn i din EJS-template.
2. Gem brugernavn i session eller som variabel og vis det sammen med beskederne.
3. Udvid beskedobjektet med brugernavn og tid.

<details>
  <summary>Vis kodehint</summary>

```js
messages.push({
  sender: username,
  text: userMessage,
  time: new Date().toLocaleTimeString()
});
```

</details>

---

## Øvelse 14: Chatbot med API-integration

**Step guide:**

1. Tilføj en route, hvor botten fx kan hente vejrudsigten.
2. Vis API-data i chatten.

<details>
  <summary>Vis kodehint</summary>

```js
// Eksempel med fetch eller axios
app.post("/chat", async (req, res) => {
  if (req.body.message.includes("vejr")) {
    // Hent data fra API og send som svar
  }
  // ...resten af chatlogikken...
});
```

</details>

---

## Øvelse 15: Chatbot med avanceret filtrering og søgning

**Step guide:**

1. Tilføj et søgefelt i din EJS-template.
2. Filtrér `messages` arrayet baseret på søgeord og vis kun relevante beskeder.

<details>
  <summary>Vis kodehint</summary>

```js
const filteredMessages = messages.filter(msg => msg.text.includes(searchTerm));
```

</details>

---

## Øvelse 16: Chatbot med dark mode og brugerindstillinger

**Step guide:**

1. Tilføj en knap til at skifte mellem light/dark mode i din EJS-template.
2. Skift CSS-klasser dynamisk baseret på brugerens valg.

<details>
  <summary>Vis kodehint</summary>

```html
<button onclick="document.body.classList.toggle('dark-mode')">
  Skift tema
</button>
```

</details>

---

## Øvelse 17: Chatbot med persistent storage

**Step guide:**

1. Gem chat-historik i en fil eller database, så beskederne bevares efter server-genstart.
2. Læs beskeder ind fra fil/database når serveren starter.

<details>
  <summary>Vis kodehint</summary>

```js
// Brug fs-modulet eller en database
```

</details>

---

## Øvelse 18: Chatbot med admin-funktioner

**Step guide:**

1. Opret en admin-side med statistik og styring af chatten.
2. Beskyt admin-siden med adgangskode eller session.

<details>
  <summary>Vis kodehint</summary>

  <!-- Opret en ny route og EJS-template til admin -->
</details>

---
