/**
 * Author: Addison Uscinowicz
 * -- UI component for creating new tasks and submitting them to the backend.
 */
import React, { useState } from 'react';

function TaskForm({ onSubmit, initialData = {}, submitText = 'Add Task' }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    due_date: initialData.due_date ? initialData.due_date.split('T')[0] : '', 
    status: initialData.status || 'todo',
    priority: initialData.priority || 'Normal',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.due_date) delete payload.due_date;

    onSubmit(payload);
    setForm({ title: '', description: '', due_date: '', status: 'todo', priority: 'Normal' });
  };

  return (
    <form className="dashboard-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />

      <label htmlFor="description">Description</label>
      <input id="description" name="description" placeholder="Description" value={form.description} onChange={handleChange} />

      <label htmlFor="due_date">Due Date</label>
      <input id="due_date" name="due_date" type="date" value={form.due_date} onChange={handleChange} />

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={form.status} onChange={handleChange}>
        <option value="todo">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <label htmlFor="priority">Priority</label>
      <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
        <option value="High">High</option>
        <option value="Normal">Normal</option>
        <option value="Low">Low</option>
      </select>

      <button type="submit">{submitText}</button>
    </form>
  );
}

export default TaskForm;
