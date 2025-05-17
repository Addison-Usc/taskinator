import React, { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'todo',
    priority: 'Normal'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', due_date: '', status: 'todo', priority: 'Normal' });
  };

  return (
    <form className="dashboard-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <label htmlFor="due_date" style={{ fontSize: '0.8rem' }}>Due Date</label>
      <input name="due_date" type="date" value={form.due_date} onChange={handleChange} />
      <label htmlFor="status" style={{ fontSize: '0.8rem' }}>Status</label>
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="todo">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <label htmlFor="priority" style={{ fontSize: '0.8rem' }}>Priority</label>
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="High">High</option>
        <option value="Normal">Normal</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
