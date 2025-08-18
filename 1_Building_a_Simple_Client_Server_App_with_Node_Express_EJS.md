# Student Guide: Building a Simple Node.js Express Server with EJS

## What You'll Build

A simple web server that displays a form, accepts user input, and shows a personalized greeting using Node.js, Express, and EJS templating.

## Prerequisites

- Node.js installed on your computer (version 18 or higher recommended)
- Basic knowledge of HTML and JavaScript
- A code editor (VS Code recommended)

## Project Overview

- **Frontend**: HTML form with EJS templating
- **Backend**: Express.js server with ES6 modules
- **Features**: Form handling, template rendering, hot reload during development

---

## Step 1: Create Project Directory and Open in VS Code

Create a new folder for your project:

```bash
mkdir node-ejs-client-server
cd node-ejs-client-server
```

Open the project in VS Code:

```bash
code .
```

**Note**: If `code .` doesn't work, open VS Code manually and use **File → Open Folder** to select your project directory.

---

## Step 2: Initialize package.json

In VS Code, create a new file called `package.json` and add the following content:

```json
{
  "name": "node-ejs-client-server",
  "version": "1.0.0",
  "description": "A simple Node.js Express server with EJS templating",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "keywords": ["node", "express", "ejs", "server"],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "ejs": "^3.1.9"
  }
}
```

**Key Points:**

- `"type": "module"` enables ES6 import/export syntax
- `"dev": "node --watch server.js"` uses Node.js built-in hot reload (no nodemon needed!)

### 🧪 Test Step 2: Verify package.json

- Save the file (Ctrl+S or Cmd+S)
- Your VS Code explorer should show `package.json` in the project root

---

## Step 3: Install Dependencies

Open VS Code's integrated terminal:

- **Menu**: Terminal → New Terminal
- **Shortcut**: Ctrl+` (backtick) or Cmd+` on Mac

Run the following command to install Express and EJS:

```bash
npm install
```

### 🧪 Test Step 3: Verify Installation

After installation completes, you should see:

- A `node_modules` folder in your project
- A `package-lock.json` file
- Success message in terminal: "added X packages, and audited Y packages"

---

## Step 4: Create the Server File (Build and Test in Parts)

### Step 4a: Basic Express Setup

In VS Code, create a new file called `server.js` in the root directory and start with this basic setup:

```javascript
import express from "express"; // Import express framework
const app = express(); // Create an instance of express

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
```

**What this does:**

- Line 1: Import the Express framework using ES6 modules
- Line 2: Create an Express application instance
- Line 5: Start the server listening on port 3000

### 🧪 Test Step 4a: Basic Server

1. Save the file (Ctrl+S or Cmd+S)
2. In terminal, run: `npm run dev`
3. You should see: "Server running at http://localhost:3000"
4. Open browser to `http://localhost:3000`
5. You'll see "Cannot GET /" - this is expected! We haven't added routes yet.
6. Stop the server (Ctrl+C) before continuing

### Step 4b: Add EJS Template Engine

Add EJS configuration to your `server.js`:

```javascript
import express from "express"; // Import express framework
const app = express(); // Create an instance of express

app.set("view engine", "ejs"); // Set EJS as the templating engine

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
```

**What this does:**

- Line 4: Tells Express to use EJS for rendering templates
- Express will now look for `.ejs` files in a `views` folder

### 🧪 Test Step 4b: EJS Configuration

1. Save the file
2. Run: `npm run dev`
3. Visit `http://localhost:3000`
4. Still see "Cannot GET /" - we need routes!
5. Stop the server (Ctrl+C)

### Step 4c: Add Basic GET Route

Add your first route:

```javascript
import express from "express"; // Import express framework
const app = express(); // Create an instance of express

app.set("view engine", "ejs"); // Set EJS as the templating engine

// GET - render the index page
app.get("/", (req, res) => {
  res.render("index", { name: "" });
});

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
```

**What this does:**

- Line 7-9: Creates a GET route for the homepage "/"
- `req` = request object (data from browser)
- `res` = response object (what we send back)
- `res.render("index", { name: "" })` renders the `index.ejs` template with an empty name

### 🧪 Test Step 4c: First Route

1. Save the file
2. Run: `npm run dev`
3. Visit `http://localhost:3000`
4. You'll see an error about missing template - this is expected!
5. The error shows Express is trying to find `views/index.ejs`
6. Stop the server (Ctrl+C)

### Step 4d: Add Form Data Processing

Add middleware to handle form data:

```javascript
import express from "express"; // Import express framework
const app = express(); // Create an instance of express

app.set("view engine", "ejs"); // Set EJS as the templating engine
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// GET - render the index page
app.get("/", (req, res) => {
  res.render("index", { name: "" });
});

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
```

**What this does:**

- Line 5: Middleware that parses form data from POST requests
- Without this, `req.body` would be undefined
- `extended: true` allows rich objects and arrays in form data

### 🧪 Test Step 4d: Middleware

1. Save the file
2. Run: `npm run dev`
3. Still no template error - we'll fix that in Step 6
4. Stop the server (Ctrl+C)

### Step 4e: Add POST Route (Final Version)

Add the POST route to handle form submissions:

```javascript
import express from "express"; // Import express framework
const app = express(); // Create an instance of express

app.set("view engine", "ejs"); // Set EJS as the templating engine
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// GET - render the index page
app.get("/", (req, res) => {
  res.render("index", { name: "" });
});

// POST - handle form submission
app.post("/submit", (req, res) => {
  res.render("index", { name: req.body.name });
});

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
```

**What this does:**

- Line 13-15: Creates a POST route for "/submit"
- `req.body.name` gets the form data (the "name" field from our form)
- Renders the same template but with the submitted name

### 🧪 Test Step 4e: Complete Server

1. Save the file
2. Check for syntax errors in VS Code (no red squiggly lines)
3. Your `server.js` is now complete!
4. We'll test it fully after creating the template in Step 6

**Summary of server.js structure:**

1. **Import & Setup**: Get Express and create app
2. **Configuration**: Set EJS as template engine
3. **Middleware**: Enable form data parsing
4. **Routes**: Handle GET (show form) and POST (process form)
5. **Start Server**: Listen on port 3000

---

## Step 5: Create Views Directory

In VS Code:

1. Right-click in the Explorer panel (left sidebar)
2. Select "New Folder"
3. Name it `views`

Or use the terminal:

```bash
mkdir views
```

### 🧪 Test Step 5: Verify Directory

- You should see a `views` folder in your VS Code Explorer
- The folder should be at the same level as `server.js` and `package.json`

---

## Step 6: Create the EJS Template (Build and Test in Parts)

### Step 6a: Create Basic HTML Structure

In VS Code:

1. Right-click on the `views` folder
2. Select "New File"
3. Name it `index.ejs`
4. Start with this basic HTML structure:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Client Server - EJS</title>
  </head>
  <body>
    <h1>Welcome to My Server!</h1>
  </body>
</html>
```

**What this does:**

- Creates a basic HTML5 document
- Sets the page title that appears in the browser tab
- Displays a simple welcome message

### 🧪 Test Step 6a: Basic Template

1. Save the file (Ctrl+S or Cmd+S)
2. In terminal, run: `npm run dev`
3. Open browser to `http://localhost:3000`
4. You should see: "Welcome to My Server!" on the page
5. Check the browser tab - it should show "Client Server - EJS"
6. Stop the server (Ctrl+C) to continue building

### Step 6b: Add the Form Structure

Replace the welcome message with a form:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Client Server - EJS</title>
  </head>
  <body>
    <form method="POST" action="/submit">
      <input type="text" name="name" placeholder="Please enter your name" />
      <button type="submit">Send</button>
    </form>
  </body>
</html>
```

**What this does:**

- `method="POST"`: Tells the form to use POST request (not GET)
- `action="/submit"`: Form data will be sent to "/submit" route
- `name="name"`: Creates a form field that the server can access as `req.body.name`
- `placeholder`: Shows hint text in the input field

### 🧪 Test Step 6b: Form Display

1. Save the file
2. Run: `npm run dev`
3. Visit `http://localhost:3000`
4. You should see:
   - An input field with placeholder text
   - A "Send" button
5. Try typing in the input field - it should work
6. Don't click "Send" yet - we haven't added the greeting logic!
7. Stop the server (Ctrl+C)

### Step 6c: Add EJS Conditional Logic

Add the greeting that appears after form submission:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Client Server - EJS</title>
  </head>
  <body>
    <form method="POST" action="/submit">
      <input type="text" name="name" placeholder="Please enter your name" />
      <button type="submit">Send</button>
    </form>

    <% if (name) { %>
    <h1>Hello <%= name %> 👋</h1>
    <% } %>
  </body>
</html>
```

**EJS Syntax Explanation:**

- `<% if (name) { %>` - JavaScript logic (if statement) - only shows greeting if name exists
- `<%= name %>` - Output variable content (escaped for security)
- `<% } %>` - Close JavaScript block

### 🧪 Test Step 6c: Complete Functionality

1. Save the file
2. Run: `npm run dev`
3. Visit `http://localhost:3000`
4. **First, test the initial load:**
   - You should see just the form (no greeting)
   - This proves the `if (name)` condition works when name is empty
5. **Now test form submission:**
   - Enter your name in the input field
   - Click "Send"
   - You should see: "Hello [Your Name] 👋" appear below the form
6. **Test different names:**
   - The form stays visible, so you can try different names
   - Each submission should update the greeting
7. Keep the server running for the next step!

### 🧪 Test Step 6d: Verify Template Structure

Your file structure should now look like:

```
node-express-ejs-client-server-app/
├── package.json
├── package-lock.json
├── server.js
├── node_modules/
└── views/
    └── index.ejs
```

### Step 6e: Understanding the EJS Flow

**When someone first visits the page (GET request):**

1. Server sends `{ name: "" }` to template
2. `<% if (name) { %>` evaluates to `false` (empty string)
3. Only the form is displayed

**When someone submits the form (POST request):**

1. Server gets form data in `req.body.name`
2. Server sends `{ name: "John" }` to template
3. `<% if (name) { %>` evaluates to `true`
4. Both form AND greeting are displayed

### 🧪 Test Step 6e: Advanced Testing

With your server still running, try these edge cases:

1. **Empty form submission:**

   - Leave the input field empty
   - Click "Send"
   - You should see "Hello 👋" (no name, but the condition still works)

2. **Special characters:**

   - Try entering "John & Jane"
   - The `<%= %>` syntax automatically escapes HTML, so it's safe

3. **Browser back button:**
   - After submitting, click browser's back button
   - You should return to the original form (no greeting)

---

## Step 7: First Test - Start Your Server

### Start the server in development mode:

In VS Code's terminal, run:

```bash
npm run dev
```

### 🧪 Test Step 7a: Verify Server Startup

You should see in the terminal:

```
Server running at http://localhost:3000
```

If you see this message, your server is working! 🎉

### 🧪 Test Step 7b: Test in Browser

1. Open your web browser
2. Navigate to `http://localhost:3000`
3. You should see:
   - A simple form with an input field
   - Placeholder text: "Please enter your name"
   - A "Send" button

### 🧪 Test Step 7c: Test Basic Functionality

1. Enter your name in the input field
2. Click the "Send" button
3. The page should reload and display: "Hello [Your Name] 👋"

### Troubleshooting Step 7:

**If the browser shows "This site can't be reached":**

- Check that the server is still running in VS Code terminal
- Make sure you're visiting exactly `http://localhost:3000`
- Try stopping the server (Ctrl+C) and running `npm run dev` again

**If you see "Cannot GET /":**

- Check your `server.js` file for the `app.get("/", ...)` route
- Make sure you saved all files

---

## Step 8: Test Hot Reload Feature

### 🧪 Test Step 8: Verify Hot Reload

1. Keep your browser open to `http://localhost:3000`
2. In VS Code, edit the `views/index.ejs` file
3. Change the title from "Client Server - EJS" to "My Awesome Server"
4. Save the file (Ctrl+S or Cmd+S)
5. Watch the terminal - you should see the server restart automatically
6. Refresh your browser - the title should have changed!

This proves that the Node.js `--watch` flag is working correctly.

---

## Step 9: Understanding the Flow

1. **Initial GET request**: Browser requests `/`

   - Server renders `index.ejs` with `name = ""`
   - Form is displayed with no greeting

2. **Form submission**: User submits form
   - Browser sends POST request to `/submit`
   - Server receives form data in `req.body.name`
   - Server renders `index.ejs` with the submitted name
   - Greeting is displayed

---

## Step 10: Development Tips and Final Testing

### 🧪 Final Comprehensive Test

Before finishing, test all functionality:

1. **Test Empty Form Submission:**

   - Don't enter anything in the form
   - Click "Send"
   - You should see "Hello 👋" (no name)

2. **Test Different Names:**

   - Try entering different names
   - Each submission should show the new name

3. **Test Direct URL Access:**

   - Visit `http://localhost:3000/submit` directly
   - You should get an error (this is expected - it's a POST-only route)

4. **Test Server Restart:**
   - Stop the server (Ctrl+C in terminal)
   - Start it again with `npm run dev`
   - Verify everything still works

### Development Workflow in VS Code

#### Using the Integrated Terminal:

- **Open Terminal**: Ctrl+` (backtick) or Cmd+` on Mac
- **New Terminal**: Click the "+" icon in terminal panel
- **Split Terminal**: Click the split icon to run multiple commands

#### Hot Reload Tips:

- Use `npm run dev` for development
- Server automatically restarts when you save changes
- No need for nodemon - Node.js has built-in `--watch` flag!
- Watch the terminal for restart messages

#### Production vs Development:

- **Development**: `npm run dev` (auto-restart on changes)
- **Production**: `npm start` (no auto-restart)

## Final Project Structure

```
node-ejs-client-server/
├── package.json          # Project configuration
├── package-lock.json     # Dependency lock file (created by npm install)
├── server.js             # Main server file
├── node_modules/         # Dependencies (created by npm install)
└── views/
    └── index.ejs         # EJS template
```

---

## VS Code Tips for Students

### Essential Shortcuts:

- **Ctrl+S / Cmd+S**: Save file
- **Ctrl+` / Cmd+`**: Toggle terminal
- **Ctrl+Shift+P / Cmd+Shift+P**: Command palette
- **Ctrl+/ / Cmd+/**: Toggle comment

### Useful Extensions (Optional):

- **EJS Language Support**: Syntax highlighting for .ejs files
- **Node.js Extension Pack**: Collection of Node.js tools
- **Thunder Client**: API testing (alternative to Postman)

---

## Common Issues & Solutions

### "Cannot GET /"

- Check if server is running on port 3000
- Make sure you're visiting `http://localhost:3000`

### "req.body is undefined"

- Ensure you have `app.use(express.urlencoded({ extended: true }));`
- Check that form method is "POST"

### "Error: Cannot find module 'express'"

- Run `npm install` to install dependencies
- Check that package.json has the correct dependencies

### Template not found

- Make sure `views` folder exists
- Check that `index.ejs` is in the `views` folder
- Verify `app.set("view engine", "ejs");` is in server.js

---

## Extension Ideas

Once you have the basic version working, try these improvements:

1. Add CSS styling
2. Validate input (check if name is empty)
3. Add more form fields (age, email, etc.)
4. Create additional pages/routes
5. Add error handling

---

## Learning Objectives Achieved

- ✅ Created a Node.js server using Express
- ✅ Used ES6 modules syntax
- ✅ Implemented form handling (GET/POST)
- ✅ Used EJS templating engine
- ✅ Understood client-server communication
- ✅ Used Node.js built-in development tools
