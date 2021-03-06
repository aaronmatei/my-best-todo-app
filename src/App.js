import React, { useContext, useReducer, useState, useEffect } from 'react';
import TodosContext from './context';
import TodosReducer from './reducer';
import TodoList from './components/TodoList';
import axios from 'axios';

import TodoForm from './components/TodoForm';

// const initialState = {
//   count: 0
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {
//         count: state.count + 1
//       };
//     case 'decrement':
//       return {
//         count: state.count - 1
//       };
//     case 'reset':
//       return initialState;
//     default:
//       return state;
//   }
// }

const useAPI = endpoint => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };
  return data;
};

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const value = useContext(UserContext);
  // const handleIncrement = () => {
  //   dispatch({ type: 'increment' });
  // };
  // const handleDecrement = () => {
  //   if (state.count === 0) {
  //     return;
  //   }
  //   dispatch({ type: 'decrement' });
  // };
  // const handleReset = () => {
  //   dispatch({ type: 'reset' });
  // };
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(TodosReducer, initialState);
  const savedTodos = useAPI('https://hooks-api.aronique.now.sh/todos');

  useEffect(() => {
    dispatch({
      type: 'GET_TODOS',
      payload: savedTodos
    });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <div className='container'>
        {/* Count: {state.count}
        <button onClick={handleIncrement} className='border p-1 m-1'>
          Increment
        </button>
        <button onClick={handleDecrement} className='border p-1 m-1'>
          Decrement
        </button>
        <button onClick={handleReset} className='border p-1 m-1'>
          Reset
        </button> */}
        <TodoForm />
        <TodoList />
      </div>
    </TodosContext.Provider>
  );
}

export default App;
