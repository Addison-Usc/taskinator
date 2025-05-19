import React from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import './TaskCommentModal.css';

function TaskCommentModal({ task, onClose }) {
  const [refreshKey, setRefreshKey] = React.useState(0);

  if (!task) return null;

  return (
    <div className="comment-modal-overlay">
      <div className="comment-modal-content">
        <button className="close-modal-button" onClick={onClose}>✕</button>


        <div className="task-info">
            <h3>{task.title}</h3>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Description:</strong> {task.description}</p>
            {task.due_date && (
                <p><strong>Due:</strong> {task.due_date.split('T')[0]}</p>
            )}
        </div>


        <AddComment
          taskId={task.id}
          onCommentAdded={() => setRefreshKey(prev => prev + 1)} 
        />
        <CommentList taskId={task.id} key={refreshKey} />
      </div>
    </div>
  );
}

export default TaskCommentModal;
