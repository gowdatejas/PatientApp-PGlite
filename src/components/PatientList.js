import { useDatabase } from '../db/DatabaseConnection';
// import  {dbInstance} from '../db/DatabaseConnection';

const PatientList = () => {
  const { patients, isInitialized } = useDatabase();

  if (!isInitialized) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2 className="form-title">Patient Records</h2>
      
      {patients.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Medical History</th>
              <th>Registered On</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.contact}</td>
                <td>{patient.medical_history || 'N/A'}</td>
                <td>{new Date(patient.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients registered yet</p>
      )}
    </div>
  );
};

export default PatientList;
