import { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';

const TaskForm = () => {
  const { dispatch } = useTasksContext();
  const [task, setTask] = useState('');
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const newTask = { task };

    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyField(json.emptyField);
    }

    if (response.ok) {
      setTask('');
      setError(null);
      setEmptyField('');
      console.log('new task added', json);
      dispatch({ type: 'CREATE_TASK', payload: json });
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <label>Task Title</label>
      <input
        type='text'
        onChange={e => setTask(e.target.value)}
        value={task}
        className={emptyField.includes('task') ? 'error' : ''}
      />
      <button>Add Task</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default TaskForm;
