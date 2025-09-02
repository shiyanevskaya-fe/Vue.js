export interface Task {
  id: number,
  title: string,
  description: string,
  isDone: boolean,
}

export interface NewTask {
  title: string,
  description: string,
}

export function addNewTask(tasks : Task[], newTask: NewTask): void {
    tasks.push({
        id: tasks.length,
        title: newTask.title,
        description: newTask.description,
        isDone: false,
    })
}

export function toggleTaskStatus(task : Task) : void {
    task.isDone = true;
}

export function getActiveTasks(tasks : Task[]) {
    return tasks.filter(task => !task.isDone)
}