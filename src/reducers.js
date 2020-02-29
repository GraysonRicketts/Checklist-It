import { combineReducers } from 'redux';
import tasks from './Checklist/tasks.reducer';
import visiblity from './Checklist/visibility.reducer';
import template from './Checklist/template.reducer';

export default combineReducers({
    tasks,
    visiblity,
    template
})