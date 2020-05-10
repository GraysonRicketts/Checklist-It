import data from '../checklistData.json';
import { Task } from './models/Task.model';
import { NotFoundError } from './NotFoundError';

function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTasks(checklistId: string): Promise<Task[]> {
  await timeout(500);

  const list = data.checklists.find((list) => list.id === checklistId);
  if (!list) {
    throw new NotFoundError(
      `Tasks: Checklist with id ${checklistId} not found`,
    );
  }

  return list.tasks;
}
