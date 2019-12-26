const express = require("express");
const bodyParser = require("body-parser");
process.env.NODE_ENV === "dev" ? require("./config/config.js") : null;

const app = express();
const PORT = process.env.PORT || 5000;
const mailer = require("./mailer");

app.use(bodyParser.json());

app.post("/ogorek/webhook", (req, res) => {
  console.log(req.body.user_column_data);
  let dummyArr = [
    { column_name: "Full Name", string_value: "FirstName LastName" },
    { column_name: "User Email", string_value: "test@example.com" },
    { column_name: "User Phone", string_value: "+16505550123" }
  ];
  // let lead = req.body.user_column_data[0];
  let formattedHtml;
  for (lead of dummyArr) {
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
  console.log(htmlBody);
  // mailer({
  //   from: "ogorek@minervawebdevelopment.com",
  //   to: "antonio@minervawebdevelopment.com",
  //   subject: "Captured Lead Data",
  //   body: htmlBody
  // });
  res.send("received data");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
