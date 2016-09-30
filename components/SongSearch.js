import React from 'react';
import { connect } from 'react-redux';
import {
  songSearch,
  videoPreview,
  playlistRemoveSong
} from '../actions';
import { inArray } from '../util';

function SongSearch(props) {

  const onKeyUp = function(e) {
    props.onChange(e.target.value)
  }

  return (
    <div className="song-search">
      <input
        className="song-search-text"
        placeholder="Find a song"
        type="text"
        onKeyUp={onKeyUp}
      />

      <SongSearchResults
        results={props.results}
        playlist={props.playlist}
        onSelect={props.onSelect}
        onRemove={props.onRemove}
      />
    </div>
  )
}

function SongSearchResults(props) {
  if (props.results && props.results.length) {
    const songIdsInPlaylist = props.playlist.map((song) => song.id);
    return (
      <ul className="collection">
        {props.results.map((song) => {

          let addButton = undefined;
          let removeButton = undefined;
          if (inArray(songIdsInPlaylist, song.id)) {
            addButton = (<span className="btn btn-small disabled"><i className="material-icons left">done</i> Added</span>);
            const firebaseId = props.playlist.filter((s) => song.id == s.id)[0]['firebaseId'];
            removeButton = (<span className="btn btn-small" onClick={props.onRemove.bind(null, firebaseId)}><i className="material-icons left">clear</i> Remove</span>);
          }
          else {
            addButton = (<span className="btn btn-small" onClick={props.onSelect.bind(null, song)}><i className="material-icons left">add</i> Add</span>);
          }

          return (
            <li className="collection-item avatar video-result" key={song.id}>
              <img src={song.thumbUrl} className="circle" />
              <span className="title-wrapper"><span className="title">{song.title}</span></span>
              <div className="buttons">
                {addButton}
                {removeButton}
              </div>
            </li>
          )
        })}
      </ul>
    );
  }
  else {
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {
    text: state.search.text,
    results: state.search.results,
    playlist: state.playlist
  };
}

const mapDispatchToProps = {
  onChange: songSearch,
  onSelect: videoPreview,
  onRemove: playlistRemoveSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongSearch);
