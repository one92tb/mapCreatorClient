import { combineReducers } from 'redux';
import { marker } from './marker';
import { mapIndicator } from './mapIndicator';
import { user } from './user';

export default combineReducers({
  marker,
  mapIndicator,
  user,
});
