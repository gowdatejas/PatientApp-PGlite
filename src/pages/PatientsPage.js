import PatientList from '../components/PatientList';
import { useDatabase } from '../db/DatabaseConnection';

const PatientsPage = () => {
  const { patients, isInitialized } = useDatabase();
  return <PatientList patients={patients} isLoading={!isInitialized} />;
};

export default PatientsPage;
