import { CognitoUserPoolTriggerHandler } from 'aws-lambda';

export const handler: CognitoUserPoolTriggerHandler = async event => {
  const expectedAnswer = event.request.privateChallengeParameters!.secretLoginCode;
  event.response.answerCorrect = event.request.challengeAnswer === expectedAnswer;

  return event;
};