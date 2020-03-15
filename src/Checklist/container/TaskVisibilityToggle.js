import React from 'react';
import { toggleVisibility as toggleVisibilityAction } from '../visibility.actions';
import { useDispatch } from "react-redux";
import Toggle from '../component/Toggle';


function TaskVisibilityToggle() {
    const dispatch = useDispatch();
    const toggleVisibility = () => {
        dispatch(toggleVisibilityAction());
    }

    return (
        <div className="visiblity-toggle-div">
            <Toggle onClick={toggleVisibility} />
            <p>Hide completed tasks</p>
        </div>
    );
}

export default TaskVisibilityToggle;