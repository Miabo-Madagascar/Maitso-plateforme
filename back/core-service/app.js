const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000; // Use the port provided by the host or default to 3000
app.listen(port, () => {
  console.log("Starting server...");
  console.log(`Server listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
