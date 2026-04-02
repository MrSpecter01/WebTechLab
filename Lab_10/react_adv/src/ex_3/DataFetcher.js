import React, { useState, useEffect } from 'react';
import './DataFetcher.css';

const DataFetcher = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch data
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty array [] means this runs only ONCE when the component loads

  // 1. Handle Loading State
  if (loading) return <div className="loader">Loading users...</div>;

  // 2. Handle Error State
  if (error) return <div className="error-msg">Error: {error}</div>;

  // 3. Handle Data Display
  return (
    <div className="data-container">
      <h2>User Directory (API Fetch)</h2>
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-item">
            <h4>{user.name}</h4>
            <p>📧 {user.email}</p>
            <p>🌐 {user.website}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataFetcher;