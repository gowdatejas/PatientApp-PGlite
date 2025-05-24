import { useEffect, useState } from 'react';
import { useDatabase } from '../db/DatabaseConnection';

const Dashboard = () => {
  const { patients, executeQuery } = useDatabase();
  const [stats, setStats] = useState({
    totalPatients: 0,
    avgAge: 0,
    genderDistribution: {},
    recentRegistrations: []
  });
  
  useEffect(() => {
    const calculateStats = async () => {
      const total = patients.length;
      
      const avgAge = patients.reduce((sum, patient) => sum + parseInt(patient.age), 0) / total || 0;
      
      const genderDist = patients.reduce((acc, patient) => {
        acc[patient.gender] = (acc[patient.gender] || 0) + 1;
        return acc;
      }, {});

      const recent = patients.slice(0, 5);

      setStats({
        totalPatients: total,
        avgAge: avgAge.toFixed(1),
        genderDistribution: genderDist,
        recentRegistrations: recent
      });

      try {
        const ageGroups = await executeQuery(
          `SELECT 
            CASE
              WHEN age < 18 THEN 'Under 18'
              WHEN age BETWEEN 18 AND 30 THEN '18-30'
              WHEN age BETWEEN 31 AND 50 THEN '31-50'
              ELSE 'Over 50'
            END as age_group,
            COUNT(*) as count
          FROM patients
          GROUP BY age_group`
        );
        
        if (ageGroups.success) {
          console.log('Age Groups:', ageGroups.data);
        }
      } catch (error) {
        console.error('Error fetching age groups:', error);
      }
    };

    if (patients.length > 0) {
      calculateStats();
    }
  }, [patients, executeQuery]);

  return (
    <div className="dashboard">
      <h2>Patient Statistics Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p className="stat-value">{stats.totalPatients}</p>
        </div>
        
        <div className="stat-card">
          <h3>Average Age</h3>
          <p className="stat-value">{stats.avgAge}</p>
        </div>
        
        <div className="stat-card">
          <h3>Gender Distribution</h3>
          <div className="gender-stats">
            {Object.entries(stats.genderDistribution).map(([gender, count]) => (
              <div key={gender} className="gender-item">
                <span className="gender-label">{gender}:</span>
                <span className="gender-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recent-patients">
        <h3>Recent Registrations</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Date Registered</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentRegistrations.map(patient => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{new Date(patient.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
