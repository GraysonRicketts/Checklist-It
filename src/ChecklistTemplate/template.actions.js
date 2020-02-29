export const saveTemplate = (tasks, name) => ({
    type: 'SAVE_TEMPLATE',
    tasks,
    name,
    dateUTC: Date.now()
});