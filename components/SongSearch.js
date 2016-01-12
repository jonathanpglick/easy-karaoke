import React from 'react';
import { connect } from 'react-redux';
import { songSearch, playlistAddSong } from '../actions';
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
        songIdsInPlaylist={props.songIdsInPlaylist}
        onSelect={props.onSelect}
      />
    </div>
  )
}

function SongSearchResults(props) {
  if (props.results && props.results.length) {
    return (
      <ul className="collection">
        {props.results.map((song) => {

          let addButton = undefined;
          if (inArray(props.songIdsInPlaylist, song.id)) {
            addButton = (<a href="" className="btn btn-small disabled"><i className="material-icons left">done</i> Added</a>);
          }
          else {
            addButton = (<a href="" className="btn btn-small" onClick={props.onSelect.bind(null, song)}><i className="material-icons left">add</i> Add</a>);
          }

          return (
            <li className="collection-item avatar video-result" key={song.id}>
              <img src={song.thumbUrl} className="circle" />
              <span className="title">{song.title}</span>
              <span className="secondary-content">
                {addButton}
              </span>
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
    songIdsInPlaylist: state.playlist.map((song) => song.id)
  };
}

const mapDispatchToProps = {
  onChange: songSearch,
  onSelect: playlistAddSong
};

export default connect(mapStateToProps, mapDispatchToProps)(SongSearch);
