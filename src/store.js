import { createStore, applyMiddleware } from 'redux';
import rootReduser from './reducers';
import { authMiddleware } from './authMiddleware';

export const store = createStore(rootReduser, applyMiddleware(authMiddleware));

store.subscribe(() => {
	localStorage['redux-store'] = JSON.stringify(store.getState());
	// console.log(store.getState())
	console.log(localStorage);
});

// localStorage.clear()
