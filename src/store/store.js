import { configureStore } from '@reduxjs/toolkit';
import baseReducer from '../reducers';
import logger from 'redux-logger';
import thunk from "redux-thunk";
import monitorReducerEnhancer from '../enhancers/monitorReducers';

const store = configureStore({ reducer: baseReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(thunk), enhancer: monitorReducerEnhancer });

export default store;
