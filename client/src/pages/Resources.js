import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/Resources.css';

function Resources({ token }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'funding',
    url: ''
  });

  const categories = ['funding', 'mentorship', 'tools', 'learning', 'events'];

  const fetchResources = useCallback(async () => {
    try {
      setLoading(true);
      const url = selectedCategory 
        ? `http://localhost:5000/api/resources?category=${selectedCategory}`
        : 'http://localhost:5000/api/resources';
      const response = await axios.get(url);
      setResources(response.data);
    } catch (err) {
      setError('Failed to load resources');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Please login to add resources');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/resources', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ title: '', description: '', category: 'funding', url: '' });
      setShowForm(false);
      fetchResources();
    } catch (err) {
      setError('Failed to add resource');
    }
  };

  const handleUpvote = async (resourceId) => {
    if (!token) {
      setError('Please login to upvote');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/resources/${resourceId}/upvote`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchResources();
    } catch (err) {
      setError('Failed to upvote resource');
    }
  };

  return (
    <div className="resources-page">
      <div className="container">
        <h1>Resources Library</h1>
        <p className="subtitle">Curated resources for founders</p>

        <div className="resources-controls">
          <div className="category-filter">
            <button 
              className={`category-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {token && (
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Add Resource'}
            </button>
          )}
        </div>

        {showForm && (
          <div className="resource-form card">
            <h3>Add New Resource</h3>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleAddResource}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>URL</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleFormChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Resource</button>
            </form>
          </div>
        )}

        {loading && <p>Loading resources...</p>}
        {error && <div className="error">{error}</div>}

        <div className="resources-grid">
          {resources.map(resource => (
            <div key={resource._id} className="resource-card card">
              <div className="resource-header">
                <h3>{resource.title}</h3>
                <span className="category-badge">{resource.category}</span>
              </div>
              <p>{resource.description}</p>
              {resource.url && (
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                  Visit Resource →
                </a>
              )}
              {resource.author && (
                <p className="resource-author">
                  Shared by {resource.author.firstName} {resource.author.lastName}
                </p>
              )}
              <div className="resource-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleUpvote(resource._id)}
                >
                  👍 {resource.upvotes}
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && resources.length === 0 && (
          <p className="text-center">No resources found</p>
        )}
      </div>
    </div>
  );
}

export default Resources;
