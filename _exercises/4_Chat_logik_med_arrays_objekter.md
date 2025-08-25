# 4. Chat logik med arrays & objekter

Denne guide bygger videre på [3_Chatbot_med_Express_og_EJS.md](3_Chatbot_med_Express_og_EJS.md) og udvider din chatbot med avanceret chatlogik, strukturering af svar, randomisering, historik og brugerdefinerede svar.

---

## Øvelse 1: Svar-database med arrays og objekter

Bemærk: Hvis du allerede har oprettet et responses-array med keywords og svar i din chatbot (se [3_Chatbot_med_Express_og_EJS.md](3_Chatbot_med_Express_og_EJS.md)), kan du bruge denne øvelse som opsummering og reference. Formålet er at sikre, at alle forstår strukturen og kan udvide den med flere svar og logik. Gå gerne direkte videre til de mere avancerede øvelser, hvis du har styr på grundstrukturen!

**Mål:**
Strukturer chatbot-svar med arrays af objekter, så du nemt kan udvide og vedligeholde din bot.

**Guide:**

1. Opret et array i `server.js`:
   ```js
   const responses = [
     { keywords: ["hej", "hello"], answers: ["Hej!", "Hello there!"] },
     { keywords: ["farvel", "bye"], answers: ["Farvel!", "Goodbye!"] }
   ];
   ```
2. Udvid POST-routen, så den matcher beskeder med keywords og vælger et svar fra `responses`.

---

## Øvelse 2: String-metoder og pattern matching

**Mål:**
Brug string-metoder til at genkende nøgleord i brugerens besked og matche dem med svar.

**Guide:**

1. Loop over `responses` og brug fx:
   ```js
   const userMessage = req.body.message.toLowerCase();
   let botReply = "Jeg forstod ikke din besked.";
   responses.forEach(resp => {
     if (resp.keywords.some(keyword => userMessage.includes(keyword))) {
       // ...vælg et svar...
     }
   });
   ```
2. Test med forskellige beskeder og se om botten svarer korrekt.

---

## Øvelse 3: Intelligent svarudvælgelse med if/else og switch

**Mål:**
Brug kontrolstrukturer til at vælge det rigtige svar, fx hvis brugeren skriver "hvordan går det" eller "tak".

**Guide:**

1. Udvid loopet med if/else eller switch:
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
Gør chatbotten mere naturlig ved at vælge et tilfældigt svar fra `answers`.

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
Byg videre med flere keywords og svarmuligheder, så botten kan håndtere flere typer beskeder.

**Guide:**

1. Tilføj flere objekter til `responses`:
   ```js
   responses.push({
     keywords: ["mad", "spise"],
     answers: ["Jeg elsker pizza!", "Hvad kan du lide at spise?"]
   });
   ```
2. Test at botten kan håndtere flere beskedtyper og svarer varieret.

---

## Øvelse 6: Chatbot med brugerdefinerede svar

**Mål:**
Lad brugeren tilføje nye svar og keywords via en form.

**Guide:**

1. Tilføj en HTML-form i din EJS-fil, hvor brugeren kan indtaste keyword og svar.
2. Tilføj en POST-route i `server.js`, der modtager keyword og svar og tilføjer dem til `responses`.
3. Test at botten nu kan svare med brugerens egne svar.

---

## Øvelse 7: Chatbot med historik og timestamp

**Mål:**
Gem tidspunktet for hver besked og vis chat-historikken med tid.

**Guide:**

1. Når du gemmer en besked i `messages`, tilføj et timestamp:
   ```js
   messages.push({
     sender: "Bruger",
     text: userMessage,
     time: new Date().toLocaleTimeString()
   });
   ```
2. Vis tidspunktet sammen med beskeden i din EJS-fil:
   ```html
   <p>
     <strong><%= msg.sender %>:</strong> <%= msg.text %>
     <em>(<%= msg.time %>)</em>
   </p>
   ```

---

## Øvelse 8: Chatbot med kategorier

**Mål:**
Organisér svar i kategorier og lad botten svare forskelligt afhængigt af kategori.

**Guide:**

1. Udvid `responses` med en kategori for hvert objekt:
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

Denne guide bygger direkte videre på din chatbot fra [3_Chatbot_med_Express_og_EJS.md](3_Chatbot_med_Express_og_EJS.md) og giver dig inspiration til at gøre din chat mere avanceret og dynamisk med arrays, objekter og brugerinput.

Sig til hvis du ønsker guides til endnu flere øvelser eller mere avancerede funktioner!
