import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import reducers from './reducers';

let logger = createLogger();

let finalCreateStore;

if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(promise)(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(
    	logger,
    	promise
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore);
}

export const store = finalCreateStore(reducers);