const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
        user: "rajeshghosh96368@gmail.com",   // your Gmail
        pass: "gkpe vebh wolw tgaj"      // NOT your Gmail password
    }
});

module.exports = transporter;
