import React from 'react';
import { connect } from 'react-redux';
import YoutubePlayer from 'react-youtube';
import { playlistRemoveSong } from '../actions';

const Player = (props) => {

  let video = (
    <p>First run instructions</p>
  );
  let songPlaying = null;
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
    songPlaying = props.playlist[0];
    video = (
      <div className="iframe-wrapper">
        <YoutubePlayer
          videoId={songPlaying.id}
          opts={youtubeOpts}
          onEnd={props.playlistRemoveSong.bind(null, songPlaying.firebaseId)}
        />
      </div>
    );
  }

  return (
    <div className="player-page">
      <div className="video">
        {video}
      </div>
      <div className="playlist">
        {props.playlist.map((song) => {
          return (<PlaylistItem 
                    song={song}
                    isPlaying={songPlaying.id === song.id}
                    onRemove={props.playlistRemoveSong.bind(null, song.firebaseId)}
                    key={song.id} />);
        })}
      </div>
    </div>
  );
}

const PlaylistItem = (props) => {
  let className = 'playlist-item';
  if (props.isPlaying) {
    className += ' playing';
  }

  return (
    <div className={className}>
      <h3>{props.song.title}</h3>
      <div className="actions">
        <span className="remove" onClick={props.onRemove}>&times;</span>
      </div>
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
