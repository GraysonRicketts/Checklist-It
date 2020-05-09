let nextTemplateId = 1;
export const createTemplate = () => ({
    type: 'CREATE_TEMPLATE',
    id: (nextTemplateId++).toString(),
    tasks: [],
    name: ''
})

export const updateTemplate = (id, tasks, name) => ({
    type: 'UPDATE_TEMPLATE',
    id,
    tasks,
    name
});

let nextTemplateTaskId = 1;
export const createTask = (templateId, text, parentTask) => ({
    type: 'CREATE_TEMPLATE_TASK',
    taskId: (nextTemplateTaskId++).toString(),
    templateId,
    text,
    parentTask
})

export const updateTask = (templateId, taskId, text) => ({
    type: 'UPDATE_TEMPLATE_TASK',
    templateId,
    taskId,
    text
})

export const deleteTask = (templateId, taskId) => ({
    type: 'DELETE_TEMPLATE_TASK',
    templateId,
    taskId
})

