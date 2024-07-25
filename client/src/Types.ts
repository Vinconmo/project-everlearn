export interface Todo {
  id?: number,
  titleTodo: string,
  dueDateTodo: Date,
  isCompletedTodo?: Boolean,
  resource: string,
  comments: string,
  createdAt?: Date,
  updatedAt?: Date,
  GoalId: number, // ^optional?
}

export interface Goal {
  id?: number,
  title: string,
  dueDate: Date,
  isCompleted?: Boolean,
  createdAt?: Date,
  updatedAt?: Date,
  Todos?: Todo[],
}
