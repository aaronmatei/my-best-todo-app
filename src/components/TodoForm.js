import React, { useState, useContext, useEffect } from 'react';
import TodosContext from '../context';
import axios from 'axios';
import uuidv4 from 'uuid';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo('');
    }
  }, [currentTodo.id]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (currentTodo.text) {
      const response = await axios.patch(
        `https://hooks-api.aronique.now.sh/todos/${currentTodo.id}`,
        {
          text: todo
        }
      );
      dispatch({ type: 'UPDATE_TODO', payload: response.data });
    } else {
      const response = await axios.post(
        'https://hooks-api.aronique.now.sh/todos',
        {
          id: uuidv4(),
          text: todo,
          complete: false
        }
      );
      if (response.data.text === '') {
        alert('No data');
        setTodo('');
      }
      dispatch({ type: 'ADD_TODO', payload: response.data });
    }
    setTodo('');
  };
  return (
    <div>
      <form
        action=''
        className='flex justify-center p-5'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          name=''
          id=''
          className='border-black border-solid border-2'
          onChange={e => setTodo(e.target.value)}
          value={todo}
        />
      </form>
    </div>
  );
}

export default TodoForm;
