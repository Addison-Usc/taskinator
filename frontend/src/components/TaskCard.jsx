import React from 'react';

function TaskCard({ task, showPriority = true, showDate = true }) {
  return (
    <div className="task-item">
      <div className={`status-dot ${task.status.replace(' ', '-')}`}></div>
      <div className="title"><strong>{task.title}</strong></div>
      <div className="status">Status: <em>{task.status}</em></div>
      {showPriority && <div className="priority">Priority: <em>{task.priority}</em></div>}
      <div className="description">{task.description}</div>
      {showDate && task.due_date && (
        <div className="due">Due: {task.due_date.split('T')[0]}</div>
      )}
    </div>
  );
}


export default TaskCard;
