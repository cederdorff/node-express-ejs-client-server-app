# 3. Chat logik med arrays & objekter

Her finder du guides og øvelser til undervisningsgangen om chatlogik i Node.js med arrays og objekter.

---

## Øvelse 1: Opret en svar-database med arrays og objekter

**Mål:**
Lær at strukturere chatbot-svar med arrays af objekter.

**Guide:**

1. Opret et array i `server.js`:
   ```js
   const responses = [
     { keywords: ["hej", "hello"], answers: ["Hej!", "Hello there!"] },
     { keywords: ["farvel", "bye"], answers: ["Farvel!", "Goodbye!"] }
   ];
   ```
2. Udvid POST-routen, så den bruger `responses` til at matche beskeder.

---

## Øvelse 2: String-metoder og pattern matching

**Mål:**
Brug string-metoder til at genkende nøgleord i brugerens besked.

**Guide:**

1. I POST-routen, loop over `responses` og brug fx:
   ```js
   const userMessage = req.body.message.toLowerCase();
   let botReply = "Jeg forstod ikke din besked.";
   responses.forEach(resp => {
     if (resp.keywords.some(keyword => userMessage.includes(keyword))) {
       // ...vælg et svar...
     }
   });
   ```
2. Test med forskellige beskeder.

---

## Øvelse 3: Intelligent svarudvælgelse med if/else og switch

**Mål:**
Brug kontrolstrukturer til at vælge det rigtige svar.

**Guide:**

1. Udvid loopet med if/else eller switch for at vælge svar baseret på keyword.
   ```js
   if (userMessage.includes("hvordan går det")) {
     botReply = "Jeg har det fint, tak!";
   } else if (userMessage.includes("tak")) {
     botReply = "Velbekomme!";
   }
   ```
2. Tilføj flere cases og test med forskellige beskeder.

---

## Øvelse 4: Tilfældig svargenerering med Math.random()

**Mål:**
Gør chatbotten mere naturlig ved at vælge et tilfældigt svar.

**Guide:**

1. Når et keyword matches, vælg et tilfældigt svar:
   ```js
   const answer = resp.answers[Math.floor(Math.random() * resp.answers.length)];
   botReply = answer;
   ```
2. Test at chatbotten svarer forskelligt på samme besked.

---

## Øvelse 5: Udvid chatbotten med flere kategorier og randomisering

**Mål:**
Byg videre på chatbotten med flere keywords og svarmuligheder.

**Guide:**

1. Tilføj flere objekter til `responses` med nye keywords og svar.
   ```js
   responses.push({ keywords: ["mad", "spise"], answers: ["Jeg elsker pizza!", "Hvad kan du lide at spise?"] });
   ```
2. Test at chatbotten kan håndtere flere typer beskeder og svarer varieret.

---

## Øvelse 6: Chatbot med brugerdefinerede svar

**Mål:**
Lad brugeren selv tilføje nye svar og keywords til chatbotten via en form.

**Guide:**

1. Tilføj en ny HTML-form i din EJS-fil, hvor brugeren kan indtaste et keyword og et svar.
2. Tilføj en POST-route i `server.js`, der modtager keyword og svar og tilføjer dem til `responses`-arrayet.
3. Test at chatbotten nu kan svare med brugerens egne svar.

---

## Øvelse 7: Chatbot med historik og timestamp

**Mål:**
Gem tidspunktet for hver besked og vis chat-historikken med tid.

**Guide:**

1. Når du gemmer en besked i `messages`, tilføj et timestamp:
   ```js
   messages.push({ sender: "Bruger", text: userMessage, time: new Date().toLocaleTimeString() });
   ```
2. Vis tidspunktet sammen med beskeden i din EJS-fil:
   ```html
   <p><strong><%= msg.sender %>:</strong> <%= msg.text %> <em>(<%= msg.time %>)</em></p>
   ```

---

## Øvelse 8: Chatbot med kategorier

**Mål:**
Organisér svar i kategorier og lad chatbotten svare forskelligt afhængigt af kategori.

**Guide:**

1. Udvid `responses`-arrayet med en kategori for hvert objekt:
   ```js
   { category: "hilsen", keywords: ["hej"], answers: ["Hej!"] }
   ```
2. Vis kategori sammen med svaret, eller brug det til at styre logikken.

---

## Øvelse 9: Chatbot med begrænsning på antal beskeder

**Mål:**
Begræns hvor mange beskeder der vises i chatten (fx de seneste 10).

**Guide:**

1. Når du tilføjer en besked til `messages`, tjek længden:
   ```js
   if (messages.length > 10) messages.shift();
   ```
2. Test at kun de seneste beskeder vises.

---

Sig til hvis du ønsker guides til endnu flere øvelser eller mere avancerede funktioner!
