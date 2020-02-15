import { combineReducers } from 'redux';
import tasks from './Checklist/tasks.reducer';
import visiblity from './Checklist/visibility.reducer';

export default combineReducers({
    tasks,
    visiblity
})