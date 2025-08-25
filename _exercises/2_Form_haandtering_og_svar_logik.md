# EJS, Form håndtering og svar logik

Her finder du øvelser, der bygger videre på [Building a Simple Client-Server App with Node.js, Express and EJS](1_Building_a_Simple_Client_Server_App_with_Node_Express_EJS.md).

---

## **1. Inputvalidering og fejlbesked**

**Mål:** Brugeren skal ikke kunne indsende en tom formular. Hvis navnefeltet er tomt, skal der vises en fejlbesked.

**Trin-for-trin:**

1. **Tilføj en error-variabel i din POST-route i `server.js`:**
    
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
    
3. **Vis fejlbeskeden i din `index.ejs`:**
    
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

## **2. Gem og vis chat-historik**

**Mål:** Gem alle navne, der indsendes, og vis dem som en liste under formularen.

**Trin-for-trin:**

1. **Opret et array i `server.js`:**
    
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
    
4. **Vis listen i din `index.ejs`:**
    
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

## **3. Tilføj flere felter til formularen**

**Mål:** Udvid formularen med et ekstra felt, fx alder, og vis både navn og alder i hilsenen.

**Trin-for-trin:**

1. **Tilføj et inputfelt for alder i `index.ejs`:**
    
    ```html
    <!-- ...existing code... -->
    <input type="text" name="age" placeholder="Indtast din alder" />
    <!-- ...existing code... -->
    ```
    
2. **Hent alder i din POST-route i `server.js`:**
    
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
    
4. **Vis alder i hilsenen i `index.ejs`:**
    
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
