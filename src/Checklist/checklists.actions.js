export const updateChecklist = (tasks) => ({
    type: 'UPDATE_CHECKLIST',
    tasks
});

let nextTodoId = 1
export const createChecklist = (tasks) => ({
    type: 'CREATE_CHECKLIST',
    id: nextTodoId++,
    tasks
})