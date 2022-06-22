export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_USER_ANSWERS = 'SAVE_USER_ANSWERS';
export const SAVE_USER_QUESTIONS = 'SAVE_USER_QUESTIONS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function saveUserAnswers({ authedUser, qid, answer }) {
  return {
    type: SAVE_USER_ANSWERS,
    authedUser,
    qid,
    answer
  };
}

export function saveUserQuestions(question) {
  return {
    type: SAVE_USER_QUESTIONS,
    authedUser: question.author,
    id: question.id
  };
}
