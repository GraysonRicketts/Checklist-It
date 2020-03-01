let nextTemplateId = 1;
export const saveTemplate = (tasks, name) => ({
    type: 'SAVE_TEMPLATE',
    id: nextTemplateId++,
    tasks,
    name,
    dateUTC: Date.now()
});