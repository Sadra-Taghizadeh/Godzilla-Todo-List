import { TasksContext } from '../context/TaskContext';
import { useContext } from 'react';

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw Error('useTasksConxt must be used inside a TasksContxtProvid');
  }

  return context;
};
