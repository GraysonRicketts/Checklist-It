let nextTodoId = 1
export const addTask = (text, parentTask) => ({
  type: 'ADD_TASK',
  id: nextTodoId++,
  text,
  parentTask
})

export const toggleTask = id => ({
  type: 'TOGGLE_TASK',
  id
})

export const editTask = (id, text) => ({
  type: 'EDIT_TASK',
  id,
  text
})

export const deleteTask = (id) => ({
  type: 'DELETE_TASK',
  id
})