import React from 'react';
import { connect } from 'react-redux';
import YoutubePlayer from 'react-youtube';
import { playlistRemoveSong } from '../actions';

const Player = (props) => {

  let video = (
    <p>First run instructions</p>
  );
  if (props.playlist.length) {
    const youtubeOpts = {
      playerVars: {
        autohide: 1,
        autoplay: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    };
    const song = props.playlist[0];
    video = (
      <YoutubePlayer
        videoId={song.id}
        opts={youtubeOpts}
        onEnd={props.playlistRemoveSong.bind(null, song.firebaseId)}
      />
    );
  }

  return (
    <div>
      <div className="player">
        {video}
      </div>
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
