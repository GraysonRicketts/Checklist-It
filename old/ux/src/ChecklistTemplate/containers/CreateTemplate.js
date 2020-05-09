import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTemplate } from '../templates.actions';
import { useHistory } from 'react-router-dom';

function CreateTemplate() {
    const dispatch = useDispatch();
    const result = dispatch(createTemplate());
    const history = useHistory();

    useEffect(() => {
        history.push(`template/${result.id}`);
    })

    return <p>loading...</p>
}

export default CreateTemplate;