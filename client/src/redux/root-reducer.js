import { combineReducers } from 'redux';
import alert from './alert/alert.reducer';

const rootReducer = combineReducers({
    alert: alertReducer
});

export default rootReducer;