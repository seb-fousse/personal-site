import * as postmark from "postmark";

const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, subject, message } = req.body;
    try {
      const response = await client.sendEmail({
        From: 'me@sebf.xyz',
        To: 'me@sebf.xyz',
        Subject: `Personal Website Contact Form: ${subject}`,
        HtmlBody: `<strong>Name:</strong> ${firstName + ' ' + lastName}<br><strong>Email:</strong> ${email}<br><strong>Subject:</strong> ${subject}<br><strong>Message:</strong> ${message}`,
        TextBody: `Name: ${firstName + ' ' + lastName}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        MessageStream: 'outbound'
      });
      console.log(response);
      if (response.ErrorCode === 0) {
        res.status(200).json({ message: 'Email sent successfully' });
      } else {
        res.status(500).json({ message: 'Failed to send email' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}