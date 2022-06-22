import * as React from 'react';
import { Provider } from 'react-redux';
import { _saveQuestion, _saveQuestionAnswer } from '../data/_DATA';
import store from '../store/store';

describe('DATA | 1. _saveQuestion working for correct data', () => {
  test('DATA | Correct Data => Expect Correct Formatting', async () => {
    const question = {
      author: "dc_comics",
      optionOneText: "Batman",
      optionTwoText: "The Joker",
    };
    const returnValue = await _saveQuestion(question);
      expect(returnValue.id).toEqual(expect.any(String));
      expect(returnValue.author).toBe(question.author);
      expect(returnValue.optionOne.text).toBe(question.optionOneText);
      expect(returnValue.optionTwo.text).toBe(question.optionTwoText);
      expect(returnValue.timestamp).toEqual(expect.any(Number));
  });
});


describe('DATA | 2a. _saveQuestion error for incorrect data', () => {
  test('DATA | Empty Data => Expect Error', async () => {
    const question = {};
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe('DATA | 2b. _saveQuestion error for incorrect data', () => {
  test('DATA | Incorrect Data => Expect Error', async () => {
    const question = {
      id: "test",
      optionOneText: "Batman",
      optionTwoText: "The Joker",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe('DATA | 3. _saveQuestionAnswer true for correct data', () => {
  test('DATA | Correct Data => Expect True', async () => {
    const answer = {
      authedUser: "tylermcginnis",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    };
    const returnValue = await _saveQuestionAnswer(answer);
      expect(returnValue).toBe(true);
  });
});

describe('DATA | 4a. _saveQuestionAnswer error for incorrect data', () => {
  test('DATA | Empty Data => Expect Error', async () => {
    const answer = {};
    await expect(_saveQuestionAnswer(answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});

describe('DATA | 4b. _saveQuestionAnswer error for incorrect data', () => {
  test('DATA | Incorrect Data => Expect Error', async () => {
    const answer = {
      authedUser: "tylermcginnis",
      qid: "8xf0y6ziyjabvozdd253nd",
    };
    await expect(_saveQuestionAnswer(answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
