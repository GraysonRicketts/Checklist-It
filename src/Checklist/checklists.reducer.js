const checklists = (state = [], action) => {
    switch (action.type) {
      case 'CREATE_CHECKLIST':
        return [
          ...state,
          {
            id: action.id,
            tasks: action.tasks,
            createdAtUTC: Date.now()
          }
        ]
      case 'UPDATE_CHECKLIST':
        return state.map(t => t.id === action.id ? 
          { 
            ...t, 
            tasks: action.tasks,
            updateAtUTC: Date.now()
          } : t);
      default:
        return state
    }
  }
  export default checklists