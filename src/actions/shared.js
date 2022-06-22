import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../data/_DATA.js';
import { addAnswer, addQuestion, receiveQuestions } from './questions';
import { receiveUsers, saveUserAnswers, saveUserQuestions } from './users';
//import { setAuthedUser } from "./authedUser";

// Fixed User for testing purposes
//export const AUTHED_ID = "sarahedo";

// Probably export is not neccessary
export function getInitialData () {
    return Promise.all([ _getUsers(), _getQuestions() ]).then(
        ([users, questions]) => ({
            users,
            questions,
        })
    )
}

export function handleInitialData() {
    return (dispatch) => {
      return getInitialData().then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
//        dispatch(setAuthedUser(AUTHED_ID));
      });
    };
}

export function saveQuestionAnswer({authedUser, qid, answer}) {
    return _saveQuestionAnswer({authedUser, qid, answer});
  }

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function handleAddAnswer({authedUser, qid, answer}) {
  return (dispatch, getState) => {
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
    .then(() => {
      dispatch(addAnswer({ authedUser, qid, answer }));
      dispatch(saveUserAnswers({ authedUser, qid, answer }));
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, authedUser) {
  return (dispatch, getState) => {
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(saveUserQuestions(question));
      });
  };
}
