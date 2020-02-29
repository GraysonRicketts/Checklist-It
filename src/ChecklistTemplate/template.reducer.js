const template = (state = [], action) => {
    console.log(`template action: ${JSON.stringify(action)}`)
    switch(action.type) {
        case 'SAVE_TEMPLATE': 
            return [
                ...state,
                {
                    name: action.name,
                    dateUTC: action.dateUTC,
                    tasks: [...action.tasks]
                }
            ];
        default:
            return state;
    }
}

export default template