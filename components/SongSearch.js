import React from 'react';
import { connect } from 'react-redux';
import { songSearch } from '../actions';

function SongSearch(props) {

  const onKeyUp = function(e) {
    props.onChange(e.target.value)
  }

  return (
    <div>
      <input
        className="song-search"
        placeholder="Find a song"
        type="text"
        onKeyUp={onKeyUp}
      />

      <div>
        {props.results.map((v) => {
          return (
            <div className="videoResult" key={v.id}>
              <h4>{v.title}</h4>
              <img src={v.thumbUrl} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state.search;
}

const mapDispatchToProps = {
  onChange: songSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(SongSearch);
