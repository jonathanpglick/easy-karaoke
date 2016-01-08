import fetch from 'isomorphic-fetch';
import settings from './settings';
import { debounce } from './util';

export const SONG_SEARCH = 'SONG_SEARCH';
export const SONG_SEARCH_TEXT = 'SONG_SEARCH_TEXT';
export const SONG_SEARCH_RESULTS = 'SONG_SEARCH_RESULTS';

export function songSearch(text) {
  return (dispatch, getState) => {

    dispatch(songSearchText(text));

    const state = getState();
    if (state.search.text.length) {
      querySongs(state.search.text, dispatch);
    }
    else {
      dispatch({ type: SONG_SEARCH_RESULTS, results: [] });
    }
  }
}

const querySongs = debounce(function(text, dispatch) {
    const query = [
      'type=video',
      'part=snippet',
      'videoEmbeddable=true',
      'maxResults=20',
      'key=' + settings.youtube.apiKey,
      'q=' + encodeURIComponent(text + ' karaoke'),
    ]
    const url = "https://www.googleapis.com/youtube/v3/search?" + query.join('&')
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        const videos = resp.items.map((i) => {
          return {
            id: i.id.videoId,
            title: i.snippet.title,
            thumbUrl: i.snippet.thumbnails.default.url
          };
        })
        dispatch({ type: SONG_SEARCH_RESULTS, results: videos });
      })
}, 300);

export function songSearchText(text) {
  return { type: SONG_SEARCH_TEXT, text: text };
}
