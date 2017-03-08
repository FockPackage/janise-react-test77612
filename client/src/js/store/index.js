import { createStore, compose, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(reduxPromise),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
};

export default configureStore;
