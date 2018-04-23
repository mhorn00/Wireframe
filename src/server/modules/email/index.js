var nodemailer = require('nodemailer');
var creds = require('./credentials');
var smtpTransport = require('nodemailer-smtp-transport');
var realEmails ='adairf625@gmail.com, myleshorn@gmail.com';
var devEmails = 'fulwejam000@mysbisd.org, hornfre000@mysbisd.org';
var uuid = require('uuid');
var {IP} = require('../../../app/const');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: creds.email,
    pass: creds.pass
  }
}));

var mailOptions = {
  from: creds.email,
  to: 'fulwejam000@mysbisd.org, hornfre000@mysbisd.org',
  subject: 'what up lol',
  text: ' what up lol '
}

module.exports = {
  register: function (user) {
    var mailOptions = {
      from: creds.email,
      to: devEmails,
      subject: `Registration Request`,
      text: `There has been a registration request from user ${user.username}, to accept it click this link: ${IP}/registerUser/${user.registrationHash}`
    }
    transporter.sendMail(mailOptions);
  }
}