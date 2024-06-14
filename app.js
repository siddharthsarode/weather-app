const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");


//set path
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));
hbs.registerPartials(path.join(__dirname, "/views/partials"));

// Routing
app.get("/", (req, res) => {
    res.render("index.hbs");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/weather", (req, res) => {
    res.render("weather");
});

app.get("*", (req, res) => {
    res.render("error");
});


app.listen(port, (err) => {
    if (err) console.log("Listening Error - ", err);
    console.log(`App is running on port: ${port}`);
})