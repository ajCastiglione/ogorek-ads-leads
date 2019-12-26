const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/ogorek/webhook", (req, res) => {
  console.log(req);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
