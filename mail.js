const csv = require('csv-parser');
const fs = require('fs');
const nodemailer = require("nodemailer");

main();

async function main() {
  let family;
  let date_string = new Date();
  let today = new Date(date_string);
  console.log(today);
  family = await extratCSV('./resources/anniv.csv');
  family.forEach(familyMember => {
    if (familyMember.Day == today.getDate() && familyMember.Month == today.getMonth() + 1) {
      let subject = "Souhaite Joyeux Anniversaire à " + familyMember.Prenom + " " + familyMember.Nom;
      let body = " Aujourd'hui c'est l'anniversaire de " + familyMember.Prenom + " " + familyMember.Nom + "oublies pas de lui souhaiter sinon je ne sers à rien.";
      sendMail(subject, body);
    }
  });
}


function extratCSV(filepath) {
  return new Promise((resolve, reject) => {
    let tab = [];
    fs.createReadStream(filepath)
      .pipe(csv())
      .on('data', (row) => tab.push(row))
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve(tab);
      });
  });
}


async function sendMail(subject, body) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: "PAVGames.pro@gmail.com",
      pass: "kyyrhhesnrngxrqt",
    },
  });

  var mailOptions = {
    from: "PAVGames.pro@gmail.com",
    to: "bergerault.vb@gmail.com",
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
