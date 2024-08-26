import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Goal, Todo } from "./DataTypes";

export interface AppContext {
  goals: Goal[];
  setGoals: Dispatch<SetStateAction<Goal[]>>;
  isAddGoal: boolean;
  setIsAddGoal: Dispatch<SetStateAction<boolean>>;
  completedGoals: Goal[];
  openGoals: Goal[];
}

export interface PropsAddAiTodo {
  setIsAddAiTodo: Dispatch<SetStateAction<boolean>>;
  goal: Goal;
  setGoal: Dispatch<SetStateAction<Goal>>;
  setGoals: Dispatch<SetStateAction<Goal[]>>;
}

export interface PropsAddGoal {
  setIsAddGoal: Dispatch<SetStateAction<boolean>>;
  setGoals: Dispatch<SetStateAction<Goal[]>>;
}

export interface PropsAddTodo {
  setIsAddTodo: Dispatch<SetStateAction<boolean>>;
  setGoal: Dispatch<SetStateAction<Goal>>;
  setGoals: Dispatch<SetStateAction<Goal[]>>;
  GoalId: number | undefined;
}

export interface PropsEmptyList {
  listName: string;
  setIsAddGoal?: Dispatch<SetStateAction<boolean>>;
  setIsAddTodo?: Dispatch<SetStateAction<boolean>>;
}

export interface PropsGoalCard {
  goal: Goal;
  setGoals: Dispatch<SetStateAction<Goal[]>>;
}

export interface PropsTodoCard {
  todo: Todo;
  onDelete: (e: MouseEvent<HTMLButtonElement>, todo: Todo) => void;
  todoCompleted: boolean;
  handleTodoComplete: (todo: Todo) => void;
  handleTodoRecover: (todo: Todo) => void;
}
