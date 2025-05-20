/**
 * Author: Addison Uscinowicz
 * -- Displays individual task details and includes buttons for editing or deleting the task.
 */

import React from 'react';

function TaskCard({
  task,
  showPriority = true,
  showDate = true,
  showDescription = true,
  onEdit,
  onDelete,
  onClick 
}) {
  return (
    <div className="task-item" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className={`status-dot ${task.status.replace(' ', '-')}`}></div>
      <div className="title"><strong>{task.title}</strong></div>
      <div className="status">Status: <em>{task.status}</em></div>
      {showPriority && <div className="priority">Priority: <em>{task.priority}</em></div>}
      {showDescription && <div className="description">{task.description}</div>}
      {showDate && task.due_date && (
        <div className="due">Due: {task.due_date.split('T')[0]}</div>
      )}

      {(onEdit || onDelete) && (
        <div className="task-actions" onClick={e => e.stopPropagation()}>
          {onEdit && <button onClick={onEdit}>Edit</button>}
          {onDelete && <button onClick={onDelete}>Delete</button>}
        </div>
      )}
    </div>
  );
}

export default TaskCard;
