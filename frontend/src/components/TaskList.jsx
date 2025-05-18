import React from 'react';
import TaskCard from './TaskCard';

function TaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
