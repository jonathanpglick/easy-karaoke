import React from 'react';

function Navbar(props) {
  let searchClass = props.active == 'search' ? 'active' : '';
  let queueClass = props.active == 'queue' ? 'active' : '';
  return (
    <div className="navbar-fixed">
      <nav className="">
        <div className="nav-wrapper">
          <ul className="left">
            <li className={searchClass}><a href="#/">Search</a></li>
            <li className={queueClass}><a href="#/queue">Queue</a></li>
          </ul>
          <ul className="right hide-on-small-only">
            <li><a href="#/player" target="_blank"><i className="material-icons right">launch</i>Launch Player</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar
