import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

let logger = createLogger();

let finalCreateStore;

if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(thunk)(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(
    	logger,
    	thunk
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore);
}

export const store = finalCreateStore(reducers);