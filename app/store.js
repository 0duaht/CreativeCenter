import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from 'reducers';
import StorageHelper from 'services/storage_helper';
import { localStorage } from 'react-native';

const enhancers = compose(applyMiddleware(thunkMiddleware));
export default createStore(reducers, {}, enhancers);

// store.subscribe(debounce(saveItem, 1000))

// debounce = (func, wait, immediate) => {
//   var timeout;
//   return function() {
//     var context = this, args = arguments;
//     var later = function() {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// };

// saveItem = () => {
//   localStorage.setItem('storeState', JSON.stringify(value));
// }

// import { createStore, compose, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import reducers from 'reducers';
// import {AsyncStorage} from 'react-native'
// import {persistStore, autoRehydrate} from 'redux-persist'

// const storeF8 = applyMiddleware()(createStore);

// export default configureStore = () => {
//   const store = autoRehydrate()(storeF8)(reducers);
//   console.log(store.getState());
//   persistStore(store, { storage: AsyncStorage, debounce: 10000 });
//   return store;
// }