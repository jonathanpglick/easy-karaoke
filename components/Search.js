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

export default Search
