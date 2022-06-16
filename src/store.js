import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReduser from './reducers';
import RootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReduser, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(RootSaga);

store.subscribe(() => {
	// console.log(store.getState())
});

// localStorage.clear()
