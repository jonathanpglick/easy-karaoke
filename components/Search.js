import React from 'react';
import { connect } from 'react-redux';
import SongSearch from './SongSearch';
import VideoPreview from './VideoPreview';
import Navbar from './Navbar';

function Search(props) {
  return (
    <div className="">
      <Navbar active="search" />
      <div className="page-content">
        <SongSearch />
      </div>
      <VideoPreview />
    </div>
  );
}

export default Search
