const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rajeshghosh96368@gmail.com",   // your Gmail
        pass: "gkpe vebh wolw tgaj"      // NOT your Gmail password
    }
});

module.exports = transporter;
