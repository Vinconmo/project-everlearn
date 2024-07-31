"use strict";
import { Todo, Goal, TodoPlanRequestType } from "./Types";

// fetch factory
function baseFetch<T>(path: string, options: RequestInit): Promise<T | void> {
  const baseURL = "http://localhost:3001";
  return fetch(`${baseURL}/${path}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  })
    .then((res) => res.json() as T)
    .catch((error) => console.log("Error fetching: ", error));
}

// use goal routes from backend
export const getGoals = (): Promise<Goal[] | void> =>
  baseFetch("goal", {
    method: "GET",
  });

export const getGoalById = (goalId: number): Promise<Goal |void> =>
  baseFetch(`goal/${goalId}`, {
    method: "GET",
  });

export const postGoal = (goal: Goal): Promise<Goal | void> =>
  baseFetch("goal", {
    method: "POST",
    body: JSON.stringify(goal),
  });

export const updateGoal = (goal: Goal): Promise<Goal | void> =>
  baseFetch(`goal/${goal.id}`, {
    method: "PUT",
    body: JSON.stringify(goal),
  });

export const deleteGoal = (goal: Goal): Promise<Goal | void> =>
  baseFetch(`goal/${goal.id}`, {
    method: "DELETE",
  });

// use todo routes from backend
export const postTodo = (todo: Todo, goalId: number): Promise<Todo | void> =>
  baseFetch(`goal/${goalId}`, {
    method: "POST",
    body: JSON.stringify(todo),
  });

export const updateTodo = (todo: Todo): Promise<Todo | void> =>
  baseFetch(`goal/todo/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
  });

export const deleteTodo = (todo: Todo): Promise<Todo | void> =>
  baseFetch(`goal/todo/${todo.id}`, {
    method: "DELETE",
  });

// use ai route from backend
export const generateTodos = (
  planDetails: TodoPlanRequestType,
  goalId: number | undefined
): Promise<Todo[] | void> =>
  baseFetch(`goal/${goalId}/ai`, {
    method: "POST",
    body: JSON.stringify(planDetails),
  });
