import Firebase from 'firebase';
import settings from './settings';

export const playlistRef = new Firebase(settings.firebase.url + '/playlist');
