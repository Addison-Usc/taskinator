import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import './DashboardPage.css';

function DashboardPage() {
  // State to hold tasks, form visibility, flash message, and week offset
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // Fetch tasks on initial load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        // Defensive fallback if no data
        setTasks(Array.isArray(data.tasks) ? data.tasks : []);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  // Task creation handler
  const handleCreateTask = async (taskData) => {
    const res = await fetch('http://localhost:3001/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(taskData)
    });

    const data = await res.json();
    setMessage(data.message || data.error);

    if (res.ok) {
      setTasks(prev => [...prev, taskData]);
      setShowForm(false);
    }
  };

  // Get dates for current week
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + currentWeekOffset * 7);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    return date;
  });

  // Filter tasks by priority
  const groupedByPriority = (level) =>
    tasks
      .filter(task => task.priority === level)
      .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
      .slice(0, 5);

  // Filter tasks by due date
  const tasksByDate = (date) => {
    const dayStr = date.toISOString().split('T')[0];
    return tasks.filter(task => task.due_date && task.due_date.startsWith(dayStr));
  };

  return (
    <div className="dashboard-container">
      {/* Top section with button and priority views */}
      <div className="dashboard-top">
        <button className="new-task-button" onClick={() => setShowForm(true)}>+ New Task</button>
        <div className="priority-row">
          <div className="priority-box">
            <h4 className="priority-label">High Priority</h4>
            {groupedByPriority('High').map((task, i) => <TaskCard key={i} task={task} />)}
          </div>
          <div className="priority-box">
            <h4 className="priority-label">Normal Priority</h4>
            {groupedByPriority('Normal').map((task, i) => <TaskCard key={i} task={task} />)}
          </div>
          <div className="priority-box">
            <h4 className="priority-label">Low Priority</h4>
            {groupedByPriority('Low').map((task, i) => <TaskCard key={i} task={task} />)}
          </div>
        </div>
      </div>

      {/* Pop-up form overlay */}
      {showForm && (
        <div className="task-form-overlay">
          <div className="overlay-content">
            <button onClick={() => setShowForm(false)} className="close-form">✕</button>
            <TaskForm onSubmit={handleCreateTask} />
          </div>
        </div>
      )}

      {/* Week navigation controls */}
      <div className="week-navigation">
        <button onClick={() => setCurrentWeekOffset(prev => prev - 1)}>&lt; Prev</button>
        <span>Week of {weekDays[0].toDateString()}</span>
        <button onClick={() => setCurrentWeekOffset(prev => prev + 1)}>Next &gt;</button>
      </div>

      {/* Horizontal day cards view */}
      <div className="weekly-view horizontal-week">
        {weekDays.map((date, idx) => (
          <div key={idx} className="day-card">
            <h5>{date.toDateString().slice(0, 10)}</h5>
            {tasksByDate(date).map((task, i) => <TaskCard key={i} task={task} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
