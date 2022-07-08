import { SES } from "aws-sdk";

const ses = new SES();

export async function sendEmail(emailAddress: string, secretLoginCode: string) {
  const params: SES.SendEmailRequest = {
    Destination: { ToAddresses: [emailAddress] },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<html><body><p>This is your secret login code:</p>
                           <h3>${secretLoginCode}</h3></body></html>`
        },
        Text: {
          Charset: 'UTF-8',
          Data: `Your secret login code: ${secretLoginCode}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Your secret login code'
      }
    },
    Source: process.env.SES_FROM_ADDRESS!
  };
  await ses.sendEmail(params).promise();
}