import React from 'react';

function Toggle(props) {
    return (
        <label className="toggle">
            <input type="checkbox" onClick={props.onClick} className="toggle-input"/>
            <span className="slider"></span>
        </label>
    )

}

export default Toggle;