import React from 'react';
import { connect } from 'react-redux';
import { songSearch, playlistAddSong } from '../actions';

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
          return (
            <div className="videoResult" key={song.id} onClick={props.onSelect.bind(null, song)}>
              <h4>{song.title}</h4>
              <img src={song.thumbUrl} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state.search;
}

const mapDispatchToProps = {
  onChange: songSearch,
  onSelect: playlistAddSong
};

export default connect(mapStateToProps, mapDispatchToProps)(SongSearch);
