import React from 'react';
import SongSearch from './SongSearch';

function Search(props) {
  return (
    <div>
      <a href="#/player" target="_blank">New Room</a>
      <div>
        <SongSearch />
      </div>
    </div>
  );
}

export default Search
