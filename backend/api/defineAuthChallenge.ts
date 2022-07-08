import { CognitoUserPoolTriggerHandler } from 'aws-lambda';
import { CHALLENGE_NAME } from "./consts";

export const handler: CognitoUserPoolTriggerHandler = async event => {
  if (event.request.session &&
    event.request.session.find(attempt => attempt.challengeName !== CHALLENGE_NAME)) {
    // We only accept custom challenges; fail auth
    event.response.issueTokens = false;
    event.response.failAuthentication = true;
  } else if (event.request.session &&
    event.request.session.length >= 3 &&
    !event.request.session.slice(-1)[0].challengeResult) {
    // The user provided a wrong answer 3 times; fail auth
    event.response.issueTokens = false;
    event.response.failAuthentication = true;
  } else if (event.request.session &&
    event.request.session.length &&
    event.request.session.slice(-1)[0].challengeName === CHALLENGE_NAME && // Doubly stitched, holds better
    event.request.session.slice(-1)[0].challengeResult) {
    // The user provided the right answer; succeed auth
    event.response.issueTokens = true;
    event.response.failAuthentication = false;
  } else {
    // The user did not provide a correct answer yet; present challenge
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = CHALLENGE_NAME;
  }

  return event;
};