import { RECEIVE_USERS, SAVE_USER_ANSWERS, SAVE_USER_QUESTIONS } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS: {
      const { users } = action;
      return {
        ...state,
        ...users
      };
    }
    case SAVE_USER_ANSWERS: {
      const { authedUser, qid, answer } = action;
      return {
        ...state,
          [authedUser]: {
            ...state[authedUser],
              answers: {
                ...state[authedUser].answers,
                [qid]: answer
              }
          }
      };
    }
    case SAVE_USER_QUESTIONS: {
      const { authedUser, id } = action;
      return {
        ...state,
          [authedUser]: {
            ...state[authedUser],
              questions: state[authedUser].questions.concat([id])
          }
      };
    }
    default:
      return state;
  }
}
