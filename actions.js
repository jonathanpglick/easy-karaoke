import fetch from 'isomorphic-fetch';
import settings from './settings';

export const SONG_SEARCH = 'SONG_SEARCH';
export const SONG_SEARCH_TEXT = 'SONG_SEARCH_TEXT';
export const SONG_SEARCH_RESULTS = 'SONG_SEARCH_RESULTS';

export function songSearch(text) {

  return (dispatch, getState) => {

    dispatch(songSearchText(text));

    const state = getState();
    if (state.search.text.length) {
      const query = [
        'type=video',
        'part=snippet',
        'videoEmbeddable=true',
        'key=' + settings.youtube.apiKey,
        'q=' + encodeURIComponent('karaoke ' + state.search.text),
      ]
      const url = "https://www.googleapis.com/youtube/v3/search?" + query.join('&')
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => {
          const videos = resp.items.map((i) => {
            return {id: i.id.videoId, title: i.snippet.title, thumbUrl: i.snippet.thumbnails.default.url};
          })
          dispatch({ type: SONG_SEARCH_RESULTS, results: videos });
        })
    }
    else {
      dispatch({ type: SONG_SEARCH_RESULTS, results: [] });
    }
  }
}

export function songSearchText(text) {
  return { type: SONG_SEARCH_TEXT, text: text };
}
