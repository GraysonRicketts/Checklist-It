const visibility = (state = false, action) => {
    switch (action.type) {
      case 'TOGGLE_VISIBILITY_FILTER':
        return !state
      default:
        return state
    }
  }
  export default visibility