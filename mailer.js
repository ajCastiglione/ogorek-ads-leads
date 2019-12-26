const nodemailer = require("nodemailer");

mailer = opts => {
  let mailOpts, smtpTrans;

  // nodemailer configuration
  try {
    smtpTrans = nodemailer.createTransport({
      host: "smtp.dreamhost.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  } catch (err) {
    console.log("Nodemailer could not create Transport");
    return;
  }

  // Mailing options
  mailOpts = {
    from: opts.from,
    replyTo: "antonio@minervawebdevelopment.com",
    to: opts.to,
    // cc: "antonio@minervawd.com",
    subject: opts.subject,
    html: opts.body
  };

  // Send email
  try {
    smtpTrans.sendMail(mailOpts, function(err, res) {
      // If sending fails
      if (err) {
        console.log(err);
      }
      // On success
      else {
        console.log(res.message || "Email sent.");
      }
    });
  } catch (err) {
    console.log("Nodemailer could not send the email.", err);
  }
};

module.exports = mailer;
