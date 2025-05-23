import { useState } from 'react';
import { useDatabase } from '../db/DatabaseConnection';

const PatientForm = () => {
  const { registerPatient,isInitialized  } = useDatabase();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    medicalHistory: ''
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.gender || !formData.contact) {
      setAlert({ type: 'error', message: 'Please fill all required fields' });
      return;
    }
    
    if (isNaN(formData.age) || formData.age < 0 || formData.age > 120) {
      setAlert({ type: 'error', message: 'Please enter a valid age (0-120)' });
      return;
    }

    const success = await registerPatient(formData);
    setAlert({
      type: success ? 'success' : 'error',
      message: success ? 'Patient registered successfully' : 'Registration failed'
    });
    
    if (success) {
      setFormData({
        name: '',
        age: '',
        gender: '',
        contact: '',
        medicalHistory: ''
      });
    }
  };

  if (!isInitialized) return <p>Loading database...</p>;
  return (
    <div className="form-container">
      <h2 className="form-title">Patient Registration</h2>
      
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-input"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            max="120"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Contact Number</label>
          <input
            type="text"
            className="form-input"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Medical History</label>
          <textarea
            className="form-input form-textarea"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="form-button">
          Register Patient
        </button>
      </form>
    </div>
  );
};

export default PatientForm;