import { createContext, useContext, useEffect, useState } from 'react';
import { getDbInstance } from './pglite';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [patients, setPatients] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [channel, setChannel] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    let syncChannel = null;

    const initializeDb = async () => {
      try {
        const dbInstance = await getDbInstance();

        await dbInstance.query(`
          CREATE TABLE IF NOT EXISTS patients (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            gender TEXT NOT NULL,
            contact TEXT NOT NULL,
            medical_history TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);

        if (window.BroadcastChannel) {
          syncChannel = new BroadcastChannel('patient_db_sync');
          syncChannel.onmessage = async () => {
            await loadPatients(dbInstance);
          };
        }

        if (isMounted) {
          setDb(dbInstance);
          setChannel(syncChannel);
          await loadPatients(dbInstance);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Database initialization failed:', error);
        if (isMounted) setIsInitialized(false);
      }
    };

    initializeDb();

    return () => {
      isMounted = false;
      if (syncChannel) syncChannel.close();
    };
  }, []);

  const loadPatients = async (database) => {
    try {
      const result = await database.query('SELECT * FROM patients ORDER BY created_at DESC');
      setPatients(result.rows);
    } catch (error) {
      console.error('Failed to load patients:', error);
    }
  };

  const registerPatient = async (patient) => {
    if (!db) return false;

    try {
      await db.query(
        `INSERT INTO patients (name, age, gender, contact, medical_history) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
          patient.name,
          patient.age,
          patient.gender,
          patient.contact,
          patient.medicalHistory
        ]
      );

      await loadPatients(db);
      if (channel) channel.postMessage({ type: 'update' });
      return true;
    } catch (error) {
      console.error('Patient registration failed:', error);
      return false;
    }
  };

  const executeQuery = async (query) => {
    if (!db) return { success: false, error: 'Database not initialized' };

    try {
      const result = await db.query(query);
      return { success: true, data: result.rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <DatabaseContext.Provider
      value={{
        isInitialized,
        patients,
        registerPatient,
        executeQuery
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
