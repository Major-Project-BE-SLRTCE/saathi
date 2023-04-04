const nodemailer = require("nodemailer");
const { GMAIL, GMAIL_PWD } = require("../utils/config");

const sendEmail = async (data) => {
  try {
    const { email, subject, body, res } = data;

    // configuring the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: GMAIL,
        pass: GMAIL_PWD
      }
    });

    const emailOptions = {
      from: GMAIL,
      to: email,
      subject,
      text: body
    };

    // sending email
    const emailResponse = await transporter.sendMail(emailOptions);

    if (emailResponse) {
      res.status(200).json({
        message: "Email sent successfully.\nDon't forget to check Spam folder."
      });
    } else {
      res.status(400).json({ message: "Something went wrong." });
    }
  } catch (err) {
    console.log("Send Email Error:\n", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = sendEmail;
