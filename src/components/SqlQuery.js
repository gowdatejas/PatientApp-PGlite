import { useState } from 'react';
import { useDatabase } from '../db/DatabaseConnection';

const SqlQuery = () => {
  const { executeQuery, isInitialized } = useDatabase();
  const [query, setQuery] = useState('SELECT * FROM patients');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExecute = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await executeQuery(query);
      setResult(response);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 className="form-title">SQL Query Interface</h2>
      
      <div className="form-group">
        <label className="form-label">Enter SQL Query</label>
        <textarea
          className="form-input form-textarea"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Example: SELECT * FROM patients WHERE age > 30"
        />
      </div>
      
      <button 
        className="form-button" 
        onClick={handleExecute}
        disabled={isLoading}
      >
        {isLoading ? 'Executing...' : 'Execute Query'}
      </button>
      
      {result && (
        <div className="query-results">
          <h3>Results {result.success ? `(${result.data?.length || 0} rows)` : ''}</h3>
          
          {result.success ? (
            <pre>{JSON.stringify(result.data, null, 2)}</pre>
          ) : (
            <div className="alert alert-error">
              <strong>Error:</strong> {result.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SqlQuery;