export interface Todo {
  id?: number,
  titleTodo: string,
  dueDateTodo: Date,
  isCompletedTodo?: boolean,
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
  isCompleted?: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  Todos: Todo[] | [],
}

export interface TodoPlanRequestType {
  learningGoal: string;
  experienceLevel: string;
  existingKnowledge: string;
  startDate: string;
  timeline: Date;
  frequency: string;
  frequencyUnit: string;
  preferredFormats: string;
  todoUnitTime: string;
  preferredLearningDays: string;
}
