import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import { createHashHistory } from 'history';
import configureStore from './store';
import { playlistRef } from './firebaseService';
import { playlistUpdate } from './actions';
import Player from './components/Player';
import Search from './components/Search';

const initialState = {
  search: {
    text: '',
    results: []
  },
  playlist: []
};
const store = configureStore(initialState);
const history = createHashHistory();

playlistRef.on('value', function(snapshot) {
  const playlistObj = snapshot.val();
  if (playlistObj) {
    // Make Firebase obj into array.
    const playlist = Object.keys(playlistObj).map((firebaseId) => {
      playlistObj[firebaseId]['firebaseId'] = firebaseId;
      return playlistObj[firebaseId];
    })
    store.dispatch(playlistUpdate(playlist));
  }
});

syncReduxAndRouter(history, store);

function Root(props) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Search} />
          <Route path="player" component={Player} />
        </Route>
      </Router>
    </Provider>
  );
}

function App(props) {
  return (
    <div>
      {props.children}
    </div>
  )
}

ReactDOM.render(<Root/>, document.querySelector("#mount"));
