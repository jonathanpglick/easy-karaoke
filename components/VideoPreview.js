import React from 'react';
import { connect } from 'react-redux';
import {
  playlistAddSong,
  videoPreviewClose
} from '../actions';

function VideoPreview(props) {
  if (!props.video) {
    return <span></span>
  }
  const videoURL = '//www.youtube.com/embed/' + props.video.id + '?rel=0&showinfo=0&start=35';
  return (
    <div className="video-preview-modal">
      <div className="modal">
        <div className="modal-content">
          <h4>Does this video have lyrics?</h4>
          <div className="buttons">
            <span className="btn btn-small" onClick={props.onSelect.bind(null, props.video)}><i className="material-icons left">add</i> Yes, add it</span>
            <span className="btn btn-small btn-warn" onClick={props.onCancel}><i className="material-icons left">clear</i> No, go back</span>
          </div>
          <div className="video">
            <iframe width="320" height="240" src={videoURL} frameBorder="0"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    video: state.preview
  };
}

const mapDispatchToProps = {
  onSelect: playlistAddSong,
  onCancel: videoPreviewClose
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPreview);
