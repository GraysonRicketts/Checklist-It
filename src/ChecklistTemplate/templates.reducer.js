const templates = (state = [], action) => {
    switch(action.type) {
        case 'SAVE_TEMPLATE': 
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    dateUTC: action.dateUTC,
                    tasks: [...action.tasks]
                }
            ];
        default:
            return state;
    }
}

export default templates