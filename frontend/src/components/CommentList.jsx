/**
 * Author: Addison Uscinowicz
 * -- Fetches and displays all comments related to a task.
 */

import React, { useEffect, useState } from 'react';

function CommentList({ taskId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/comments/${taskId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  return (
    <div className="comment-list">
      <h4>Comments</h4>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.username}</strong>: {comment.content}
            <br />
            <small>{new Date(comment.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
