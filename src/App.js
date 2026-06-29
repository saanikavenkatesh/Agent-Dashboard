import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import GroupDashboard from './GroupDashboard';
import AgentDetail from './AgentDetail';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(process.env.REACT_APP_DATA_URL || './data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Loading agent metrics...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', color: '#e24b4a' }}>
        Error loading data: {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <Router basename="/Agent-Dashboard/">
      <Routes>
        <Route path="/" element={<GroupDashboard data={data} />} />
        <Route path="/agent/:agentId" element={<AgentDetail data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;
