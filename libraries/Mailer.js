const nodemailer = require('nodemailer');

/**
 * Mailer library class
 * @author Kenneth Sumang
 * @since  2023.04.06
 */
module.exports = class Mailer {
  transporter = null;

  /**
   * Constructor
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      port: parseInt(process.env.SMTP_PORT, 10) || 465,
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });
  }

  /**
   * Sends mail using transporter
   * @param from
   * @param to
   * @param subject
   * @param content
   */
  async sendMail(from, to, subject, content) {
    const mailData = {
      from: from,
      to: to,
      subject: subject,
      html: content,
    };

    const response = await this.transporter.sendMail(mailData);
    console.log(response);
    return response;
  }
}