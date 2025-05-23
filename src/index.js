import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}>
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      borderRadius: '8px',
      backgroundColor: '#f5f5f5'
    }}>
      <h2>Loading Application</h2>
      <p>Please wait while we initialize the database...</p>
    </div>
  </div>
);


async function initializeApp() {
  try {
    await import('./wasmLoader');
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize application:', error);
    root.render(
      <div style={{ 
        padding: '2rem',
        color: 'red',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1>Application Error</h1>
        <p>Failed to initialize the application. Please try refreshing the page.</p>
        <p>If the problem persists, contact support.</p>
        <p style={{ 
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#ffeeee',
          borderRadius: '4px'
        }}>
          Error details: {error.message}
        </p>
      </div>
    );
  }
}

initializeApp();