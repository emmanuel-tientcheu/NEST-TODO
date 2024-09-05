export enum TodoStatus {
    TODO = 'todo',
    DOING = 'doing',
    DONE = 'done'
}

export function isValidStatus(status: string): boolean {
    return Object.values(TodoStatus).includes(status as TodoStatus);
  }

  export function stringToTodoStatus(status: string): TodoStatus | null {
    if (Object.values(TodoStatus).includes(status as TodoStatus)) {
        return status as TodoStatus;
    }
    return null;
}