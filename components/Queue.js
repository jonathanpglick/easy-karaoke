import React from 'react';
import { connect } from 'react-redux';
import YoutubePlayer from 'react-youtube';
import { playlistRemoveSong } from '../actions';
import Navbar from './Navbar';

const Queue = (props) => {
  return (
    <div className="">
      <Navbar active="queue" />
      <div className="page-content">
        <ul className="collection">
          {props.playlist.map((song) => {
            return (<QueueItem 
                      song={song}
                      onRemove={props.playlistRemoveSong.bind(null, song.firebaseId)}
                      key={song.id} />);
          })}
        </ul>
      </div>
    </div>
  );
}

const QueueItem = (props) => {
  return (
    <li className="collection-item avatar video-result">
      <img src={props.song.thumbUrl} className="circle" />
      <div className="queue--item--content">
        <span className="queue--item--title"><span className="title">{props.song.title}</span></span>
        <div className="queue--item--buttons">
          <span className="btn btn-small" onClick={props.onRemove}><i className="material-icons">clear</i></span>
        </div>
      </div>
    </li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
