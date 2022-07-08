import { SNS } from "aws-sdk";

const sns = new SNS();

export async function sendMessage(phoneNumber: string, secretLoginCode: string) {
  await sns.publish({
    Message: `Your secret login code: ${secretLoginCode}`,
    PhoneNumber: phoneNumber
  }).promise();
}