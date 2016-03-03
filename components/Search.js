import React from 'react';
import SongSearch from './SongSearch';

function Search(props) {
  return (
    <div className="page-search">
      <a href="#/player" target="_blank">Launch Player</a>
      <div>
        <SongSearch />
      </div>
    </div>
  );
}

function VideoPreview(props) {

  return (
    <div className="video-preview-modal">
      <div className="modal">
        <div className="modal-content">
          <div className="video-container">
            <iframe width="320" height="240" src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0" frameBorder="0"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
