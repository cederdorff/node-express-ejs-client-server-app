import express from "express"; // Import express framework
const app = express(); // Create an instance of express

app.set("view engine", "ejs"); // Set EJS as the templating engine
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const names = [];

// GET - render the index page
app.get("/", (req, res) => {
  res.render("index", { name: "", age: "", error: "", names });
});

// POST - handle form submission
app.post("/submit", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  let error = "";
  if (!name || name.trim() === "") {
    error = "Du skal indtaste et navn!";
  } else if(!age || Number.isNaN(Number(age))) {
    error = "Du skal indtaste en alder!";
  }else {
    names.push(name);
  }
  res.render("index", { name, age, error, names });
});

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
