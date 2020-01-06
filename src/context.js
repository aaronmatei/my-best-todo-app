import React, { createContext } from 'react';

const TodosContext = createContext({
  todos: [
    { id: 1, text: 'Eat Breakfast', complete: false },
    { id: 2, text: 'Wash Car', complete: false },
    { id: 3, text: 'Read React', complete: false },
    { id: 4, text: 'Sign documents', complete: false },
    { id: 5, text: 'Go for jogging', complete: false }
  ],
  currentTodo: {}
});

export default TodosContext;
