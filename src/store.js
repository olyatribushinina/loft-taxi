import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReduser from './reducers';
import Sagas from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReduser, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(Sagas);

store.subscribe(() => {
	localStorage['redux-store'] = JSON.stringify(store.getState());
	// console.log(store.getState())
	console.log(localStorage);
});

// localStorage.clear()
