const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Mailer = require('./libraries/Mailer');

dotenv.config();

const app = express();
app.use(bodyParser.json());
const port = parseInt(process.env.PORT, 10) || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/sendmail', async (req, res) => {
  try {
    const mailer = new Mailer();
    const response = await mailer.sendMail(
      req.body.from,
      req.body.to,
      req.body.subject,
      req.body.content
    );
    res.json(response);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      error: {
        code: 500,
        message: 'An error occurred while sending your mail.'
      }
    })
  }

});

app.listen(port, () => {
  console.log(`Nodemailer listening on port ${port}`);
});