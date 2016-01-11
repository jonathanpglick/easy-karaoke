import React from 'react';
import { connect } from 'react-redux';
import { playlistRemoveSong } from '../actions';

const Player = (props) => {
  return (
    <div>
      <div className="player">Player</div>
      <div className="playlist">
        {props.playlist.map((song) => {
          return (<PlaylistItem song={song} onRemove={props.playlistRemoveSong.bind(null, song.firebaseId)} key={song.id} />);
        })}
      </div>
    </div>
  );
}

const PlaylistItem = (props) => {
  return (
    <div className="playlist-item">
      <h3>{props.song.title}</h3>
      <button onClick={props.onRemove}> X Remove</button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    playlist: state.playlist
  };
}

const mapDispatchToProps = {
  playlistRemoveSong: playlistRemoveSong
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
