import React, { useState } from 'react';

function AddComment({ taskId, onCommentAdded }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await fetch(`http://localhost:3001/api/comments/${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      if (res.ok) {
        setContent('');
        onCommentAdded(); 
      } else {
        alert(data.error || 'Failed to add comment');
      }
    } catch (err) {
      console.error('Comment POST error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add comment..."
        rows={3}
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      <button type="submit" className="comment-link-button">Post Comment</button>
    </form>
  );
}

export default AddComment;
