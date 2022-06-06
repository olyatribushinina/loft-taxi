import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReduser from './reducers';
import RootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReduser, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(RootSaga);

store.subscribe(() => {
	// localStorage['redux-store'] = JSON.stringify(store.getState());
	// console.log(store.getState())
	// console.log(JSON.parse(localStorage.getItem('redux-store')).payment.userCardData);
});

// localStorage.clear()
