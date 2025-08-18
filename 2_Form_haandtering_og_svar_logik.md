# Øvelsesguides til Node.js Express Chatbot

Her finder du tre udførlige øvelser, der bygger videre på din første chatbot/server.

---

## Øvelse 2: Inputvalidering og fejlbesked

**Mål:**
Brugeren skal ikke kunne indsende en tom formular. Hvis navnefeltet er tomt, skal der vises en fejlbesked.

**Trin-for-trin:**

1. **Tilføj en error-variabel i din POST-route i `server.js`:**

   ```js
   // ...existing code...
   app.post("/submit", (req, res) => {
     const name = req.body.name;
     let error = "";
     if (!name || name.trim() === "") {
       error = "Du skal indtaste et navn!";
     }
     res.render("index", { name, error });
   });
   // ...existing code...
   ```

2. **Send også error-variablen med i din GET-route:**

   ```js
   // ...existing code...
   app.get("/", (req, res) => {
     res.render("index", { name: "", error: "" });
   });
   // ...existing code...
   ```

3. **Vis fejlbeskeden i din `index.ejs`:**

   ```html
   <!-- ...existing code... -->
   <% if (error) { %>
   <p style="color: red;"><%= error %></p>
   <% } %>
   <!-- ...existing code... -->
   ```

4. **Test:**
   - Start serveren.
   - Indsend en tom formular.
   - Fejlbeskeden skal vises.

---

## Øvelse 3: Gem og vis chat-historik

**Mål:**
Gem alle navne, der indsendes, og vis dem som en liste under formularen.

**Trin-for-trin:**

1. **Opret et array i `server.js`:**

   ```js
   // ...existing code...
   const names = [];
   // ...existing code...
   ```

2. **Push navnet til arrayet, hvis det ikke er tomt:**

   ```js
   // ...existing code...
   app.post("/submit", (req, res) => {
     const name = req.body.name;
     let error = "";
     if (!name || name.trim() === "") {
       error = "Du skal indtaste et navn!";
     } else {
       names.push(name);
     }
     res.render("index", { name, error, names });
   });
   // ...existing code...
   ```

3. **Send også arrayet med i din GET-route:**

   ```js
   // ...existing code...
   app.get("/", (req, res) => {
     res.render("index", { name: "", error: "", names });
   });
   // ...existing code...
   ```

4. **Vis listen i din `index.ejs`:**

   ```html
   <!-- ...existing code... -->
   <ul>
     <% names.forEach(n => { %>
     <li><%= n %></li>
     <% }) %>
   </ul>
   <!-- ...existing code... -->
   ```

5. **Test:**
   - Indsend flere navne.
   - Listen skal opdateres og vise alle navne.

---

## Øvelse 4: Tilføj flere felter til formularen

**Mål:**
Udvid formularen med et ekstra felt, fx alder, og vis både navn og alder i hilsenen.

**Trin-for-trin:**

1. **Tilføj et inputfelt for alder i `index.ejs`:**

   ```html
   <!-- ...existing code... -->
   <input type="text" name="age" placeholder="Indtast din alder" />
   <!-- ...existing code... -->
   ```

2. **Hent alder i din POST-route i `server.js`:**

   ```js
   // ...existing code...
   app.post("/submit", (req, res) => {
     const name = req.body.name;
     const age = req.body.age;
     let error = "";
     if (!name || name.trim() === "") {
       error = "Du skal indtaste et navn!";
     } else {
       names.push(name);
     }
     res.render("index", { name, age, error, names });
   });
   // ...existing code...
   ```

3. **Send også age med i din GET-route:**

   ```js
   // ...existing code...
   app.get("/", (req, res) => {
     res.render("index", { name: "", age: "", error: "", names });
   });
   // ...existing code...
   ```

4. **Vis alder i hilsenen i `index.ejs`:**

   ```html
   <!-- ...existing code... -->
   <% if (name) { %>
   <h1>Hello <%= name %> (<%= age %> år) 👋</h1>
   <% } %>
   <!-- ...existing code... -->
   ```

5. **Test:**
   - Indsend navn og alder.
   - Hilsenen skal vise begge dele.

---

## Øvelse 5: Byg din egen chat bot med Express og EJS

**Mål:**  
Brug din viden om Express, EJS og form-håndtering til at lave serverlogikken til din egen chat bot. Du har allerede en HTML form – nu skal du få serveren til at modtage beskeder, gemme dem og svare tilbage.

**Trin-for-trin:**

1. **Opret et array til chatbeskeder i `server.js`:**

   ```js
   // ...existing code...
   const messages = [];
   // ...existing code...
   ```

2. **Tilføj en POST-route, der modtager beskeder fra formularen:**

   ```js
   // ...existing code...
   app.post("/chat", (req, res) => {
     const userMessage = req.body.message;
     let botReply = "";
     if (!userMessage || userMessage.trim() === "") {
       botReply = "Skriv en besked for at chatte!";
     } else {
       botReply = `Du skrev: ${userMessage}`;
       messages.push({ sender: "Bruger", text: userMessage });
       messages.push({ sender: "Bot", text: botReply });
     }
     res.render("index", { messages, botReply });
   });
   // ...existing code...
   ```

3. **Send også messages og botReply med i din GET-route:**

   ```js
   // ...existing code...
   app.get("/", (req, res) => {
     res.render("index", { messages, botReply: "" });
   });
   // ...existing code...
   ```

4. **Tilpas din HTML form i `index.ejs` til chat:**

   ```html
   <!-- ...existing code... -->
   <form method="POST" action="/chat">
     <input type="text" name="message" placeholder="Skriv din besked her" />
     <button type="submit">Send</button>
   </form>
   <!-- ...existing code... -->
   ```

5. **Vis chatbeskederne i `index.ejs`:**

   ```html
   <!-- ...existing code... -->
   <div>
     <% messages.forEach(msg => { %>
     <p><strong><%= msg.sender %>:</strong> <%= msg.text %></p>
     <% }) %>
   </div>
   <!-- ...existing code... -->
   ```

6. **Test:**
   - Skriv en besked i chatten og send.
   - Både din besked og bot-svaret skal vises i chatten.
   - Prøv at sende en tom besked – botten skal svare med en fejlbesked.

---

## Øvelse 6: Udvid din chat bot med intelligent svarlogik

**Mål:**  
Udvid din chat bot, så den kan svare forskelligt afhængigt af beskedens indhold.

**Trin-for-trin:**

1. **Tilpas POST-routen i `server.js` med flere svarmuligheder:**

   ```js
   // ...existing code...
   app.post("/chat", (req, res) => {
     const userMessage = req.body.message;
     let botReply = "";
     if (!userMessage || userMessage.trim() === "") {
       botReply = "Skriv en besked for at chatte!";
     } else {
       // Udvidet bot-logik: svar forskelligt afhængigt af beskedens indhold
       if (userMessage.toLowerCase().includes("hej")) {
         botReply = "Hej med dig!";
       } else if (userMessage.toLowerCase().includes("hvordan går det")) {
         botReply = "Jeg har det fint, tak! Hvordan går det med dig?";
       } else if (userMessage.toLowerCase().includes("farvel")) {
         botReply = "Farvel! Vi ses.";
       } else {
         botReply = `Du skrev: ${userMessage}`;
       }
       messages.push({ sender: "Bruger", text: userMessage });
       messages.push({ sender: "Bot", text: botReply });
     }
     res.render("index", { messages, botReply });
   });
   // ...existing code...
   ```

2. **Test:**
   - Prøv at skrive "hej", "hvordan går det" eller "farvel" og se botten svare forskelligt.
   - Udvid evt. med flere keywords og svar.

---

## Øvelse 7: Inputvalidering og sanitering af chatbeskeder

**Mål:**  
Sørg for at din chat bot kun accepterer gyldige beskeder og beskytter mod skadelig kode (fx HTML-tags).

**Trin-for-trin:**

1. **Tilføj en funktion til at sanitere input i `server.js`:**

   ```js
   // ...existing code...
   function sanitizeInput(str) {
     return str.replace(/[<>]/g, ""); // Fjerner < og >
   }
   // ...existing code...
   ```

2. **Brug funktionen, når du modtager beskeder:**

   ```js
   // ...existing code...
   app.post("/chat", (req, res) => {
     let userMessage = req.body.message;
     userMessage = sanitizeInput(userMessage);
     let botReply = "";
     if (!userMessage || userMessage.trim() === "") {
       botReply = "Skriv en besked for at chatte!";
     } else {
       // ...din bot-logik...
     }
     // ...existing code...
   });
   // ...existing code...
   ```

3. **Udvid valideringen, så beskeder fx skal være mindst 2 tegn:**

   ```js
   if (!userMessage || userMessage.trim().length < 2) {
     botReply = "Beskeden skal være mindst 2 tegn!";
   }
   ```

4. **Test:**
   - Prøv at sende beskeder med HTML-tags (fx `<script>`) – de skal fjernes.
   - Prøv at sende for korte beskeder – botten skal vise en fejlbesked.

**Ekstra:**

- Udvid saniteringen til at fjerne andre tegn eller ord.
- Giv brugeren feedback, hvis beskeden ikke er gyldig.

---
