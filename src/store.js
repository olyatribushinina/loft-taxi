import { createStore, applyMiddleware } from 'redux';
import rootReduser from './reducers';
import { authMiddleware } from './authMiddleware';

export const store = createStore(rootReduser, applyMiddleware(authMiddleware));

