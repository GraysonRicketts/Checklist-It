const templates = (state = [], action) => {
    switch(action.type) {
        case 'CREATE_TEMPLATE':
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    tasks: [...action.tasks]
                }
            ];
        case 'UPDATE_TEMPLATE': 
            return state.map(tm => tm.id === action.id ? {
                ...tm,
                name: action.name? action.name : tm.name,
                tasks: action.tasks ? [...action.tasks] : tm.tasks
            } : tm);
        case 'CREATE_TEMPLATE_TASK':
            return state.map(tm => tm.id === action.templateId ? {
                ...tm,
                tasks: [
                    ...tm.tasks,
                    { 
                        id: action.taskId,
                        text: action.text,
                        parentTask: action.parentTask
                    }
                ]
            } : tm);
        case 'UPDATE_TEMPLATE_TASK':
            return state.map(tm => tm.id === action.templateId ? {
                ...tm,
                tasks: tm.tasks.map(t => t.id === action.taskId ? {
                    ...t,
                    text: action.text
                }: t)
            } : tm);
        case 'DELETE_TEMPLATE_TASK':
            return state.map(tm => tm.id === action.templateId ? {
                ...tm,
                tasks: tm.tasks.filter(t => t.id !== action.taskId)
            } : tm)
        default:
            return state;
    }
}

export default templates