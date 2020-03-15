const checklists = (state = [], action) => {
    switch (action.type) {
      case 'CREATE_CHECKLIST':
        return [
          ...state,
          {
            id: action.id,
            tasks: action.tasks.map(t => ({ ...t, completed: false })),
            name: action.name,
          }
        ]
      case 'UPDATE_CHECKLIST':
        return state.map(c => c.id === action.id ? 
          { 
            ...c, 
            tasks: action.tasks
          } : c);
      case 'TOGGLE_TASK':
        return state.map(c => c.id === action.id ? {
          ...c,
<<<<<<< HEAD
          tasks: c.tasks.map(t => t.id === action.taskId ? {
                ...t,
                completed: !t.completed
            } : t)
=======
          tasks: c.tasks.map((t) => {
            if (t.id === action.taskId) {
              return {
                ...t,
                completed: !t.completed
              }
            }

            return t;
          })
>>>>>>> ae4001dd79b403c050008e48b03a63f69f5c8404
        } : c);
      default:
        return state
    }
  }
  export default checklists