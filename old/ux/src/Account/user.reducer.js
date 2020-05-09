const user = (state = null, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                email: action.email
            };
        case 'LOGOUT': 
            return null
        default:
            return state;
    }
}

export default user