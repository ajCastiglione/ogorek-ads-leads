const express = require("express");
const bodyParser = require("body-parser");
process.env.NODE_ENV === "dev" ? require("./config/config.js") : null;

const app = express();
const PORT = process.env.PORT || 5000;
const mailer = require("./mailer");

app.use(bodyParser.json());

app.post("/ogorek/webhook", (req, res) => {
  let leads = req.body.user_column_data;
  let formattedHtml = "";

  for (let lead of leads) {
    formattedHtml += `
    <tr>
    <td>${lead.column_name}:</td><td>${lead.string_value}</td>
    </tr>
    `;
  }

  const htmlBody = `<table>
  <th>Lead Data</th>
  <tbody>
  ${formattedHtml}
  </tbody>
  </table>`;

  mailer({
    from: "ogorek@minervawebdevelopment.com",
    to: "antonio@minervawebdevelopment.com",
    subject: "Captured Lead Data",
    body: htmlBody
  });

  res.send("received data");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
