export type Template = {
    id: string,
    name: string,
    tasks: TemplateTask
}

export type TemplateTask = {
    id: string,
    text: string,
    parentTask?: string
}