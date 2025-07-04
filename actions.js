import fetch from 'isomorphic-fetch';
import settings from './settings';
import { debounce } from './util';
import { playlistRef } from './firebaseService';

export const SONG_SEARCH = 'SONG_SEARCH';
export const SONG_SEARCH_TEXT = 'SONG_SEARCH_TEXT';
export const SONG_SEARCH_RESULTS = 'SONG_SEARCH_RESULTS';
export const PLAYLIST_UPDATE = 'PLAYLIST_UPDATE';
export const VIDEO_PREVIEW = 'VIDEO_PREVIEW';
export const VIDEO_PREVIEW_CLOSE = 'VIDEO_PREVIEW_CLOSE';

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
    const blacklist = settings.youtube.searchBlacklist.map((i) => '-'+i).join(' ')
    const query = [
      'type=video',
      'part=snippet',
      'videoEmbeddable=true',
      'maxResults=10',
      'key=' + settings.youtube.apiKey,
      'q=' + encodeURIComponent(text + ' karaoke ' + blacklist),
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
}, 500);

export function songSearchText(text) {
  return { type: SONG_SEARCH_TEXT, text: text };
}

export function playlistAddSong(song) {
  return function(dispatch, getState) {
    playlistRef.push(song);
  }
}

export function playlistRemoveSong(firebaseId) {
  return function(dispatch, getState) {
    playlistRef.child(firebaseId).remove();
  }
}

export function playlistUpdate(playlist) {
  return { type: PLAYLIST_UPDATE, playlist: playlist };
}

export function videoPreview(videoId) {
  return { type: VIDEO_PREVIEW, id: videoId };
}

export function videoPreviewClose(videoId) {
  return { type: VIDEO_PREVIEW_CLOSE };
}
