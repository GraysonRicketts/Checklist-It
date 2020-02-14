const tasks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          parentTask: action.parentTask,
          completed: false
        }
      ]
    case 'EDIT_TASK':
      return state.map(t => t.id === action.id ? { ...t, text: action.text} : t);
    case 'TOGGLE_TASK':
      return state.map(t => t.id === action.id ? {...t, completed: !t.completed} : t);
    default:
      return state
  }
}
export default tasks