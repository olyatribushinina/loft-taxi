import { createStore, applyMiddleware } from 'redux';
import rootReduser from './redusers/index';
import { authMiddleware } from './authMiddleware';

export const store = createStore(rootReduser, applyMiddleware(authMiddleware));

