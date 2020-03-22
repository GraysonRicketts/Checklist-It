import { combineReducers } from 'redux';
import visiblity from './Checklist/visibility.reducer';
import templates from './ChecklistTemplate/templates.reducer';
import checklists from './Checklist/checklists.reducer';
import user from './Account/user.reducer';

export default combineReducers({
    visiblity,
    templates,
    checklists,
    user
})