require("dotenv").config();
import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";

const sendEmail = async (req, res) => {
  if (req.body.data) {
    var {
      firstName,
      lastName,
      school,
      curse,
      phone,
      gender,
      age,
      weight,
      height,
    } = req.body.data;

    height.toString().replace(",", ".");
    var heightM = parseInt(height) / 100;

    const imc = Math.round(weight / Math.pow(heightM, 2));

    const transporter = nodemailer.createTransport({
      host: "mail.brumalosrios.cl",
      port: "587",
      secure: false,
      auth: {
        user: "jpadilla@brumalosrios.cl",
        pass: "aA54141919@",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const options = {
      viewEngine: {
        extname: ".handlebars",
        layoutsDir: "src/public/views",
        defaultLayout: "email",
      },
      viewPath: "src/public/views",
    };

    transporter.use("compile", hbs(options));

    try {
      const info = await transporter.sendMail({
        from: "'Bruma Los Rios' <jpadilla@brumalosrios.cl>",
        to: process.env.EMAIL_TO,
        cc: "jpadilla@setinfo.cl",
        subject: "Información IMC",
        template: "email",
        context: {
          firstName,
          lastName,
          school,
          curse,
          phone,
          gender,
          age,
          weight,
          heightM,
          imc,
        },
      });

      console.log("Mensaje enviado ", info.messageId);

      if (info) {
        res.status(200).json({ message: "Email send successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  } else {
    console.log("Here!");
  }
};

module.exports = { sendEmail };
