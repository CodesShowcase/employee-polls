import React from "react";
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";
import {fireEvent, render, screen } from "@testing-library/react";
import NewPoll from "../components/Poll/NewPoll";
import { setAuthedUser } from "../actions/authedUser";
import store from '../store/store';


describe('FireEvent | 1. Radio Button Click Test', () => {
  test('FireEvent | OptionOne is selected => should verify', async () => {
      const user = { id: "sarahedo" }
      store.dispatch(setAuthedUser(user));

      render(
        <MemoryRouter>
          <Provider store={store}>
            <NewPoll/>
          </Provider>
        </MemoryRouter>
      )

      const optionOne = screen.getByTestId("optionOne");
      fireEvent.change(optionOne, {target: {value: "OptionOne"}});
      expect(optionOne.value).toEqual("OptionOne");
    });
});
