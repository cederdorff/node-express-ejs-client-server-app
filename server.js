import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.render("index", { name: "" });
});

app.post("/submit", (request, response) => {
  console.log("request.body:", request.body);

  const name = request.body.name;

  response.render("index", { name });
});

app.listen(port, () => {
  console.log(`Serveren kører på http://localhost:${port}`);
});
