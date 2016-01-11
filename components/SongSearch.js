import React from 'react';
import { connect } from 'react-redux';
import { songSearch, playlistAddSong } from '../actions';
import { inArray } from '../util';

function SongSearch(props) {

  const onKeyUp = function(e) {
    props.onChange(e.target.value)
  }

  return (
    <div>
      <input
        className="song-search"
        placeholder="Find a song"
        type="text"
        onKeyUp={onKeyUp}
      />

      <div>
        {props.results.map((song) => {

          let addButton = undefined;
          if (inArray(props.songIdsInPlaylist, song.id)) {
            addButton = (<strong><em>Already Selected!!!</em></strong>);
          }
          else {
            addButton = (<button onClick={props.onSelect.bind(null, song)}>+ Add</button>);
          }

          return (
            <div className="videoResult" key={song.id}>
              <h4>{song.title}</h4>
              <img src={song.thumbUrl} />
              {addButton}
            </div>
          )
        })}
      </div>
    </div>
  )
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
