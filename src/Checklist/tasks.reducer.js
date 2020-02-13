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
    case 'TOGGLE_TASK':
      const newState = [...state];
      const toggledTask = newState.find(t => t.id === action.id);
      toggledTask.completed = !toggledTask.completed;
      console.log(`new state: ${JSON.stringify(newState)}`)
      return newState;
    default:
      return state
  }
}
export default tasks