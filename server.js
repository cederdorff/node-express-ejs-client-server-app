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
