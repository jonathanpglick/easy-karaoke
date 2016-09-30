import React from 'react';
import { connect } from 'react-redux';
import SongSearch from './SongSearch';
import VideoPreview from './VideoPreview';

function Search(props) {
  return (
    <div className="page-search">
      <a href="#/player" target="_blank">Launch Player</a>
      <div>
        <SongSearch />
      </div>
      <VideoPreview />
    </div>
  );
}

export default Search
