import React from 'react';
import { connect } from 'react-redux';
import {
  songSearch,
  videoPreview,
  playlistRemoveSong
} from '../actions';
import { inArray } from '../util';

function SongSearch(props) {

  const onSubmit = function(e) {
    e.preventDefault();
    var input = document.getElementById("search-song-text");
    props.onSearch(input.value)
  }

  const content = props.results.length ? (
    <SongSearchResults
      results={props.results}
      playlist={props.playlist}
      onSelect={props.onSelect}
      onRemove={props.onRemove}
    />
  )
  : (
    <div className="welcome-content">
      <p>Search for a song above and hit the <strong>+</strong> button to add it to the queue.</p>
    </div>
  );

  return (
    <div className="song-search">
      <form onSubmit={onSubmit}>
        <input
          id="search-song-text"
          className="song-search-text"
          placeholder="Search songs"
          type="text"
        />
      </form>

      {content}
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
            const firebaseId = props.playlist.filter((s) => song.id == s.id)[0]['firebaseId'];
            removeButton = (<span className="btn btn-small btn-warn" onClick={props.onRemove.bind(null, firebaseId)}><i className="material-icons">clear</i></span>);
          }
          else {
            addButton = (<span className="btn btn-small" onClick={props.onSelect.bind(null, song)}><i className="material-icons">add</i></span>);
          }

          return (
            <li className="collection-item avatar video-result" key={song.id}>
              <img src={song.thumbUrl} className="circle" />
              <div className="song--item--content">
                <span className="song--item--title"><span className="title">{song.title}</span></span>
                <div className="song--item--buttons">
                  {addButton}
                  {removeButton}
                </div>
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
  onSearch: songSearch,
  onSelect: videoPreview,
  onRemove: playlistRemoveSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongSearch);
