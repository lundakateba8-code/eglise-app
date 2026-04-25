// MENU
document.getElementById("menu-btn").onclick = () => {
    let menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
};

// NAVIGATION
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}

// FORMULAIRE
document.getElementById("form").onsubmit = function(e) {
    e.preventDefault();
    document.getElementById("msg").innerText = "🙏 Prière envoyée ! Que Dieu vous bénisse.";
};
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1/eglise");

// MODEL USER
const User = mongoose.model("User", {
    name: String,
    email: String,
    password: String,
    role: String // "admin" ou "membre"
});

// REGISTER
app.post("/register", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send("Compte créé");
});

// LOGIN
app.post("/login", async (req, res) => {
    const user = await User.findOne(req.body);
    if (user) res.send(user);
    else res.send("Erreur");
});

app.listen(3000, () => console.log("Serveur lancé"));