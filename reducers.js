import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import {
  SONG_SEARCH,
  SONG_SEARCH_TEXT,
  SONG_SEARCH_RESULTS
} from './actions';

function searchReducer(state = {}, action) {
  switch(action.type) {

    case SONG_SEARCH:
      return state;

    case SONG_SEARCH_TEXT:
      return Object.assign({}, state, { text: action.text });

    case SONG_SEARCH_RESULTS:
      return Object.assign({}, state, { results: action.results });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  routing: routeReducer,
  search: searchReducer
});

export default rootReducer;
