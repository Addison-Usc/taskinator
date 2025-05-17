import React from 'react';

function TaskCard({ task }) {
  return (
    <div className="task-item">
      <div className="title"><strong>{task.title}</strong></div>
      <div className="status">Status: <em>{task.status}</em></div>
      <div className="priority">Priority: <em>{task.priority}</em></div>
      <div className="description">{task.description}</div>
      {task.due_date && <div className="due">Due: {task.due_date}</div>}
    </div>
  );
}

export default TaskCard;
