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
          let alreadySelected = undefined;
          if (inArray(props.songIdsInPlaylist, song.id)) {
            alreadySelected = (<strong><em>Already Selected!!!</em></strong>);
          }
          return (
            <div className="videoResult" key={song.id} onClick={props.onSelect.bind(null, song)}>
              <h4>{song.title} {alreadySelected}</h4>
              <img src={song.thumbUrl} />
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
