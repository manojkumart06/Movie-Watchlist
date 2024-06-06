const redux = require('redux');
const { fetchReducer } = require('./reducers/fetchReducer');


export const store = redux.createStore(fetchReducer);