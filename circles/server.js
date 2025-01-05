const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Users storage (temporary file-based database)
const USERS_FILE = path.join(__dirname, "users.json");

// Helper to read/write users
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Routes
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users[username] && users[username] === password) {
    res.status(200).json({ message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid username or password." });
  }
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users[username]) {
    res.status(400).json({ message: "Username already exists." });
  } else {
    users[username] = password;
    writeUsers(users);
    res.status(200).json({ message: "Signup successful!" });
  }
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "game.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/home`);
});
