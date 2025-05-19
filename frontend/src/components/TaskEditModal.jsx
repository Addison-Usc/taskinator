import React from 'react';
import TaskForm from './TaskForm';

function TaskEditModal({ task, onClose, onSave }) {
  const handleUpdate = async (updatedTask) => {
    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await res.json();
      if (res.ok) {
        onSave(); // tells Dashboard to reload tasks
        onClose(); // close modal
      } else {
        alert(data.error || 'Error updating task.');
      }
    } catch (err) {
      console.error('Edit failed:', err);
      alert('Failed to update task.');
    }
  };

  return (
    <div className="task-form-overlay">
      <div className="overlay-content">
        <button onClick={onClose} className="close-form">✕</button>
        <h3>Edit Task</h3>
        <TaskForm
          onSubmit={handleUpdate}
          initialData={task}
          submitText="Save Changes"
        />
      </div>
    </div>
  );
}

export default TaskEditModal;
