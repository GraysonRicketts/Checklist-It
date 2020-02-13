let nextTodoId = 1
export const addTask = (text, parentTask) => ({
  type: 'ADD_TASK',
  id: nextTodoId++,
  text,
  parentTask
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTask = id => ({
  type: 'TOGGLE_TASK',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}