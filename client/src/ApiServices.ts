'use strict'
import {Todo, Goal} from "./Types"

// fetch factory
function baseFetch<T>(path: string, options: RequestInit): Promise<T> {
  const baseURL = 'http://localhost:3001';
  return (
    fetch(`${baseURL}/${path}`, {
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      ...options,
    })
      .then(res => res.json() as Promise<T>) // ^how to handle errors with typescript
  );
};

// ^why T above and here not Goal[]
// function getGoal(): Promise<Goal[]> {
//   return fetch(`${BASE_URL}/goal`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(res => res.json() as Promise<Goal[]>)
// }

// ^way to test it here?
// use goal routes from backend
export const getGoals = (): Promise<Goal[]> => baseFetch('goal', {
  method: 'GET'
});

export const getGoalById = (goalId: number): Promise<Goal> => baseFetch(`goal/${goalId}`, {
  method: 'GET'
});

export const postGoal = (goal: Goal): Promise<Goal> => baseFetch('goal', {
  method: 'POST',
  body: JSON.stringify(goal)
});

export const updateGoal = (goal: Goal): Promise<Goal> => baseFetch(`goal/${goal.id}`, {
  method: 'PUT',
  body: JSON.stringify(goal)
});

export const deleteGoal = (goal: Goal): Promise<Goal> => baseFetch(`goal/${goal.id}`, {
  method: 'DELETE',
});

// use todo routes from backend
export const postTodo = (todo: Todo, goalId: number): Promise<Todo> => baseFetch(`goal/${goalId}`, {
  method: 'POST',
  body: JSON.stringify(todo)
});

export const updateTodo = (todo: Todo): Promise<Todo> => baseFetch(`goal/todo/${todo.id}`, {
  method: 'PUT',
  body: JSON.stringify(todo)
});

export const deleteTodo = (todo: Todo): Promise<Todo> => baseFetch(`goal/todo/${todo.id}`, {
  method: 'DELETE',
});
