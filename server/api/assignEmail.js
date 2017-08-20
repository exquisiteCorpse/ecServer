const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

const assignmentEmail = (user, friend, corpse) => {
  return  {
    from: 'Exquisite Corpse Mobile <exquisitecorpsemobile@gmail.com>',
    to: friend.email,
    subject: `You're up! Exquisite Corpse In Progress..`,
    text:`You've been selected by ${user.username} to help complete ${corpse.name}! Please login to the mobile app to see your edges to complete. You'll receive another e-mail when ${corpse.name} is finished`,
    html:`<p>You've been selected by ${user.username} to help complete ${corpse.name}! Please login to the mobile app to see your edges to complete. You'll receive another e-mail when ${corpse.name} is finished</p>`
  }
}

const completeEmail = (users) => {
  const user1 = users[0].email
  const user2 = users[1].email
  const user3 = users[2].email
  return {
    from: 'Exquisite Corpse Mobile <exquisitecorpsemobile@gmail.com>',
    to: user1,
    user2,
    user3,
    subject: 'Corpse Complete',
    text:`Login to the app to see your recently completed corpse(s)`,
    html:`<p>Login to the app to see your recently completed corpse(s)</p>`
  }
}


module.exports = {assignmentEmail, transporter, completeEmail}
