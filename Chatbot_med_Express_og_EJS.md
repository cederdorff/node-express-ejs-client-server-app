# Chatbot med Express og EJS

## Indledning

I denne opgave skal du tilpasse dit eksisterende Node.js/Express-projekt, så det fungerer som en simpel chatbot. Du starter med at indsætte din chat bot HTML-formular og evt. CSS i din løsning (husk at bruge `.ejs` til templating). Herefter skal du tilføje serverlogik, så beskeder modtages, gemmes og vises, og til sidst gøre din bot mere intelligent og robust med validering og sanitering.

---

## 1. Byg din egen chat bot med Express og EJS

**Mål:**
Brug din viden om Express, EJS og form-håndtering til at lave serverlogikken til din egen chat bot. Du har allerede en HTML form – nu skal du få serveren til at modtage beskeder, gemme dem og svare tilbage.

**💡 EJS-opgave:** Start med at forklare kort, hvad EJS er, og hvorfor vi bruger det i Node/Express. Vis derefter, hvordan du dynamisk rendere HTML med EJS i din chat.

**Eksempel på EJS forklaring:**
EJS (Embedded JavaScript) er et templating-system, der gør det muligt at generere dynamisk HTML på serveren. I stedet for at sende statiske HTML-filer kan vi bruge EJS til at indsætte data direkte i HTML'en før den sendes til browseren.

**💡 Form-håndtering opgave:** Sikr dig, at du har `app.use(express.urlencoded({ extended: true }))` i din server, og demonstrér, hvordan data sendes fra din HTML-form til serveren.

**Eksempel på middleware setup:**
```js
import express from "express";
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // VIGTIGT: Skal være før dine routes!

// Dine routes kommer herefter...
```

**Trin-for-trin:**

1. **Opret et array til chatbeskeder i `server.js`:**
   ```js
   // ...existing code...
   const messages = []; // Dette array gemmer alle chatbeskeder
   // ...existing code...
   ```
   
   **Forklaring:** Vi bruger et array til at gemme alle beskeder, så vi kan vise hele samtalen på siden.

2. **Tilføj en POST-route, der modtager beskeder fra formularen:**
   ```js
   // ...existing code...
   app.post("/chat", (req, res) => {
     const userMessage = req.body.message; // Henter besked fra formularen
     let botReply = "";
     
     // Tjek om beskeden er tom
     if (!userMessage || userMessage.trim() === "") {
       botReply = "Skriv en besked for at chatte!";
     } else {
       botReply = `Du skrev: ${userMessage}`;
       
       // Gem både bruger og bot besked
       messages.push({ sender: "Bruger", text: userMessage });
       messages.push({ sender: "Bot", text: botReply });
     }
     
     // Send data til EJS template
     res.render("index", { messages, botReply });
   });
   // ...existing code...
   ```
   
   **Forklaring:** Denne route modtager POST-requests fra formularen og gemmer beskeder i vores array.

3. **Send også messages og botReply med i din GET-route:**
   ```js
   // ...existing code...
   app.get("/", (req, res) => {
     res.render("index", { messages, botReply: "" });
   });
   // ...existing code...
   ```
   
   **Forklaring:** GET-routen viser siden første gang. Vi sender en tom `botReply` og vores `messages` array.

4. **Tilpas din HTML form i `index.ejs` til chat:**
   ```html
   <!-- ...existing code... -->
   <form method="POST" action="/chat">
     <input type="text" name="message" placeholder="Skriv din besked her" required />
     <button type="submit">Send</button>
   </form>
   <!-- ...existing code... -->
   ```

   **Bemærk:**
   - `method="POST"` sender data sikkert til serveren
   - `action="/chat"` peger på vores POST-route
   - `name="message"` matcher `req.body.message` i serveren
   - `required` sikrer, at feltet ikke er tomt
   
   **Eksempel på komplet formular med styling:**
   ```html
   <div class="chat-container">
     <h1>Min Chatbot</h1>
     <form method="POST" action="/chat" class="chat-form">
       <input type="text" name="message" placeholder="Skriv din besked her" required />
       <button type="submit">Send</button>
     </form>
   </div>
   ```

5. **Vis chatbeskederne i `index.ejs`:**
   ```html
   <!-- ...existing code... -->
   <div class="chat-messages">
     <% messages.forEach(msg => { %>
       <div class="message <%= msg.sender.toLowerCase() %>">
         <strong><%= msg.sender %>:</strong> <%= msg.text %>
       </div>
     <% }) %>
   </div>
   <!-- ...existing code... -->
   ```
   
   **Forklaring af EJS-syntax:**
   - `<% %>` - JavaScript kode (loops, if-statements)
   - `<%= %>` - Output variable (escaped for sikkerhed)
   - `forEach()` - Loop gennem alle beskeder i messages array
   
   **Eksempel på styling til beskeder:**
   ```css
   .chat-messages {
     max-height: 400px;
     overflow-y: auto;
     border: 1px solid #ccc;
     padding: 10px;
     margin-bottom: 10px;
   }
   
   .message {
     margin-bottom: 10px;
     padding: 5px;
   }
   
   .message.bruger {
     text-align: right;
     background-color: #e3f2fd;
   }
   
   .message.bot {
     text-align: left;
     background-color: #f5f5f5;
   }
   ```

6. **Test:**
   - Start din server med `npm run dev`
   - Gå til `http://localhost:3000`
   - Skriv en besked i chatten og send
   - Både din besked og bot-svaret skal vises i chatten
   - Prøv at sende en tom besked – botten skal svare med en fejlbesked
   
   **Fejlfinding:**
   - Hvis siden ikke loader: Tjek at serveren kører på port 3000
   - Hvis beskeder ikke vises: Tjek at EJS syntax er korrekt
   - Hvis POST ikke virker: Tjek at middleware er sat op

---

## 2. Udvid din chat bot med intelligent svarlogik

**Mål:**
Udvid din chat bot, så den kan svare forskelligt afhængigt af beskedens indhold.

**💡 Behandling af brugerinput opgave:** Generér kontekstuelle svar baseret på input og brug arrays og objekter til at strukturere chat-logik.

**💡 Request-objektet opgave:** I dette trin skal du arbejde med `req.body` for at hente form-data. Tilføj også en ekstra route, hvor du demonstrerer forskellen på `req.body`, `req.query` og `req.params`.

**Trin-for-trin:**

1. **Opret et array af objekter til svar-logik:**
   ```js
   // Tilføj dette øverst i din server.js
   const responses = [
     { keywords: ["hej", "hello", "hi"], answers: ["Hej med dig!", "Hello there!", "Hej! Hvordan går det?"] },
     { keywords: ["hvordan går det", "hvordan har du det"], answers: ["Jeg har det fint, tak!", "Det går godt med mig!"] },
     { keywords: ["farvel", "bye", "ses"], answers: ["Farvel!", "Vi ses!", "Tak for snakken!"] },
     { keywords: ["hjælp", "help"], answers: ["Jeg kan hjælpe dig med at chatte!", "Spørg mig om hvad som helst!"] }
   ];
   ```

2. **Tilpas POST-routen i `server.js` med flere svarmuligheder:**
2. **Tilpas POST-routen i `server.js` med flere svarmuligheder:**
   ```js
   app.post("/chat", (req, res) => {
     const userMessage = req.body.message; // Dette er req.body i brug!
     let botReply = "";
     
     if (!userMessage || userMessage.trim() === "") {
       botReply = "Skriv en besked for at chatte!";
     } else {
       // Smart svar-logik med arrays og objekter
       const lowerMessage = userMessage.toLowerCase();
       let foundResponse = false;
       
       // Loop gennem alle response objekter
       for (let response of responses) {
         // Tjek om nogen keywords matcher
         for (let keyword of response.keywords) {
           if (lowerMessage.includes(keyword)) {
             // Vælg et tilfældigt svar fra answers array
             const randomIndex = Math.floor(Math.random() * response.answers.length);
             botReply = response.answers[randomIndex];
             foundResponse = true;
             break;
           }
         }
         if (foundResponse) break;
       }
       
       // Hvis intet keyword matchede
       if (!foundResponse) {
         botReply = `Du skrev: "${userMessage}". Prøv at skrive "hej" eller "hjælp"!`;
       }
       
       messages.push({ sender: "Bruger", text: userMessage });
       messages.push({ sender: "Bot", text: botReply });
     }
     
     res.render("index", { messages, botReply });
   });
   ```
   
   **Forklaring:**
   - Vi bruger arrays og objekter til at organisere svar-logik
   - `Math.random()` giver variation i svarene
   - Nested loops finder det rigtige svar baseret på keywords

3. **Test den nye logik:**
   - Prøv at skrive "hej", "hello" eller "hi" - botten skal svare forskelligt hver gang
   - Prøv "hvordan går det" - botten skal give et relevant svar
   - Prøv "farvel" eller "bye" - botten skal sige farvel
   - Skriv noget helt andet - botten skal give et standard-svar

---

## 3. Inputvalidering og sanitering af chatbeskeder

**Mål:**
Sørg for at din chat bot kun accepterer gyldige beskeder og beskytter mod skadelig kode (fx HTML-tags).

**💡 Inputvalidering og sanitering opgave:** Forklar først, hvorfor det er vigtigt at validere og rense data. Implementér derefter simple teknikker til at validere og rense data.

**Forklaring af sikkerhed:**
Inputvalidering og sanitering er kritisk for websikkerhed. Ondsindede brugere kan prøve at indsætte skadelig kode (som HTML/JavaScript) i formularer, hvilket kan ødelægge din side eller stjæle data fra andre brugere. Ved at rense input beskytter vi vores applikation.

**Trin-for-trin:**

1. **Tilføj en funktion til at sanitere input i `server.js`:**
   ```js
   // Tilføj denne funktion øverst i din fil
   function sanitizeInput(input) {
     if (typeof input !== 'string') return '';
     
     return input
       .replace(/[<>]/g, "") // Fjerner < og > (forebygger HTML-tags)
       .replace(/javascript:/gi, "") // Fjerner javascript: links
       .replace(/on\w+=/gi, "") // Fjerner event handlers som onclick=
       .trim(); // Fjerner whitespace i start og slut
   }
   
   // Alternativ mere grundig version:
   function sanitizeInputAdvanced(input) {
     if (typeof input !== 'string') return '';
     
     return input
       .replace(/[<>'"]/g, "") // Fjerner potentielt farlige tegn
       .replace(/script/gi, "") // Fjerner "script" ord
       .slice(0, 500) // Begræns længde til 500 tegn
       .trim();
   }
   ```

2. **Tilføj validering og brug saniteringsfunktionen:**
2. **Tilføj validering og brug saniteringsfunktionen:**
   ```js
   app.post("/chat", (req, res) => {
     let userMessage = req.body.message;
     
     // Sanitér input FØRST
     userMessage = sanitizeInput(userMessage);
     
     let botReply = "";
     let error = "";
     
     // Validér input
     if (!userMessage || userMessage.trim() === "") {
       error = "Du skal skrive en besked!";
       botReply = "Skriv en besked for at chatte!";
     } else if (userMessage.length < 2) {
       error = "Beskeden skal være mindst 2 tegn lang!";
       botReply = "Din besked er for kort. Prøv igen!";
     } else if (userMessage.length > 500) {
       error = "Beskeden er for lang (max 500 tegn)!";
       botReply = "Din besked er for lang. Prøv at gøre den kortere!";
     } else {
       // Normal chat-logik her...
       const lowerMessage = userMessage.toLowerCase();
       let foundResponse = false;
       
       for (let response of responses) {
         for (let keyword of response.keywords) {
           if (lowerMessage.includes(keyword)) {
             const randomIndex = Math.floor(Math.random() * response.answers.length);
             botReply = response.answers[randomIndex];
             foundResponse = true;
             break;
           }
         }
         if (foundResponse) break;
       }
       
       if (!foundResponse) {
         botReply = `Du skrev: "${userMessage}". Prøv at skrive "hej" eller "hjælp"!`;
       }
       
       // Gem beskederne kun hvis der ikke er fejl
       if (!error) {
         messages.push({ sender: "Bruger", text: userMessage });
         messages.push({ sender: "Bot", text: botReply });
       }
     }
     
     res.render("index", { messages, botReply, error });
   });
   ```

3. **Vis fejlbeskeder i din EJS-template:**
   ```html
   <!-- Tilføj dette før din formular i index.ejs -->
   <% if (typeof error !== 'undefined' && error) { %>
     <div class="error-message" style="color: red; background: #ffe6e6; padding: 10px; margin: 10px 0; border-radius: 5px;">
       <strong>Fejl:</strong> <%= error %>
     </div>
   <% } %>
   ```

4. **Test sikkerhedsforanstaltningerne:**
   - Prøv at skrive `<script>alert('test')</script>` - script-tags skal fjernes
   - Prøv at skrive kun ét tegn - der skal komme en fejlbesked
   - Prøv at skrive en meget lang besked - der skal komme en fejlbesked
   - Prøv en normal besked - den skal virke som forventet

**Ekstra:**
- Udvid saniteringen til at fjerne andre tegn eller ord
- Giv brugeren feedback, hvis beskeden ikke er gyldig
- Tilføj en "ryd chat" knap, der tømmer messages arrayet
- Eksperimentér med at gemme beskeder med timestamps

**Debugging tips:**
- Brug `console.log()` til at se, hvad der sker i din kode
- Tjek browser developer tools (F12) for fejl
- Test din app grundigt med forskellige inputs

**Avancerede udvidelser:**
- Tilføj emoticons til bot-svar
- Lav en "typing..." indikator
- Gem chat-historik i en fil eller database
- Tilføj støtte for billeder eller links

---

**Tip:**
- Kommentér din kode undervejs, så du og andre kan forstå logikken
- Spørg underviseren, hvis du er i tvivl om noget!
- Prøv at eksperimentere med layout og styling i din EJS-fil
- Test altid din app efter hver ændring
