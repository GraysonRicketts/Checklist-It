import { BaseChecklistDTO } from './dto/BaseChecklist.dto';
import { pick } from 'lodash';
import data from '../checklistData.json';

function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getBaseChecklists(): Promise<BaseChecklistDTO[]> {
  await timeout(3000);
  const dtoData = data.checklists.map((c) => ({
    id: c.id,
    name: c.name,
    numTasks: c.tasks.length,
    numComplete: c.tasks.filter((t) => t.completed).length,
  }));

  return dtoData;
}
