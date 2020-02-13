import React from 'react';
import { addTask } from '../tasks.actions';
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";


function AddTask(props) {
    let input;
    const { parentTask } = props;
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
        if (!input.value.trim()) {
            return
        }
        dispatch(addTask(input.value, parentTask))
        input.value = ''
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="add-task-form">
                <button type="submit">Add</button>
                <input
                    ref={node => {
                        input = node
                    }}
                />
            </form>
        </div>
    );
}

export default connect()(AddTask);