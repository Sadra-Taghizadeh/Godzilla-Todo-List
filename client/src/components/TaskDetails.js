import { useTasksContext } from '../hooks/useTasksContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();

  const handleClick = async () => {
    const response = await fetch(`/api/tasks/${task._id}`, {
      method: 'DELETE',
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_TASK', payload: json });
    }
  };

  const handleEdit = async () => {};

  return (
    <div className='task-details'>
      <h4>{task.task}</h4>
      <p>
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
      </p>
      <div className='button-container'>
        <span className='material-symbols-outlined' onClick={handleClick}>
          Delete
        </span>
        <span className='material-symbols-outlined' onClick={handleEdit}>
          Edit
        </span>
      </div>
    </div>
  );
};

export default TaskDetails;