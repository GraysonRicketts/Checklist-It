import { combineReducers } from 'redux';
import tasks from './common/tasks.reducer';
import visiblity from './Checklist/visibility.reducer';
import templates from './ChecklistTemplate/templates.reducer';
import checklists from './Checklist/checklists.reducer';

export default combineReducers({
    tasks,
    visiblity,
    templates,
    checklists
})