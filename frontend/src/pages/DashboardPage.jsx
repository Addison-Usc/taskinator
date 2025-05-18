import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import './DashboardPage.css';

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [showAllPriority, setShowAllPriority] = useState({ High: false, Normal: false, Low: false });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          console.error("Tasks is not an array", data);
        }
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

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

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + currentWeekOffset * 7);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    return date;
  });

  const groupedByPriority = (level, showAll = false) =>
    tasks
      .filter(task => task.priority === level)
      .sort((a, b) => {
        const aDate = a.due_date ? new Date(a.due_date) : Infinity;
        const bDate = b.due_date ? new Date(b.due_date) : Infinity;
        return aDate - bDate;
      })
      .slice(0, showAll ? undefined : 5);

  const tasksByDate = (date) => {
  const dayStr = date.toLocaleDateString('en-CA');
  return tasks.filter(task => task.due_date && task.due_date.startsWith(dayStr));
};

  const toggleShowAll = (level) => {
    setShowAllPriority(prev => ({ ...prev, [level]: !prev[level] }));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-top">
        <button className="new-task-button" onClick={() => setShowForm(true)}>+ New Task</button>
        <div className="priority-row">
          {['High', 'Normal', 'Low'].map(level => (
            <div key={level} className="priority-box">
              <h4 className="priority-label">{level} Priority</h4>
              {groupedByPriority(level, showAllPriority[level]).map((task, i) => (
                <TaskCard key={i} task={task} showPriority={false} />
              ))}
              {groupedByPriority(level, true).length > 5 && (
                <button className="show-more-button" onClick={() => toggleShowAll(level)}>
                  {showAllPriority[level] ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="task-form-overlay">
          <div className="overlay-content">
            <button onClick={() => setShowForm(false)} className="close-form">✕</button>
            <TaskForm onSubmit={handleCreateTask} />
          </div>
        </div>
      )}

      <div className="week-navigation">
        <button onClick={() => setCurrentWeekOffset(prev => prev - 1)}>&lt; Prev</button>
        <span>Week of {weekDays[0].toDateString()}</span>
        <button onClick={() => setCurrentWeekOffset(prev => prev + 1)}>Next &gt;</button>
      </div>

      <div className="weekly-view horizontal-week">
        {weekDays.map((date, idx) => (
          <div key={idx} className="day-card">
            <h5>{date.toDateString().slice(0, 10)}</h5>
            {tasksByDate(date).map((task, i) => (
              <TaskCard key={i} task={task} showDate={false} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
