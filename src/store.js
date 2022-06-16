import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReduser from './reducers';
import RootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
	rootReduser,
	localStorage['redux-state'] ? JSON.parse(localStorage['redux-state']) : {},
	applyMiddleware(sagaMiddleware));

sagaMiddleware.run(RootSaga);

store.subscribe(() => {
	localStorage['redux-state'] = JSON.stringify(store.getState());

})
// console.log(store.getState())


