import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import {
  SONG_SEARCH,
  SONG_SEARCH_TEXT,
  SONG_SEARCH_RESULTS,
  PLAYLIST_UPDATE,
  VIDEO_PREVIEW,
  VIDEO_PREVIEW_CLOSE
} from './actions';

function searchReducer(state = {}, action) {
  switch (action.type) {

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

function playlistReducer(playlist = [], action) {
  if (action.type === PLAYLIST_UPDATE) {
    return action.playlist;
  }
  return playlist
}

function previewReducer(preview = false, action) {
  switch (action.type) {

    case VIDEO_PREVIEW:
      return action.id;

    case VIDEO_PREVIEW_CLOSE:
      return false;

    default:
      return false;
  }
}

const rootReducer = combineReducers({
  routing: routeReducer,
  search: searchReducer,
  playlist: playlistReducer,
  preview: previewReducer
});

export default rootReducer;
