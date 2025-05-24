import PatientForm from '../components/PatientForm';
import { useDatabase } from '../db/DatabaseConnection';

const HomePage = () => {
  const { registerPatient } = useDatabase();
  return <PatientForm onRegister={registerPatient} />;
};

export default HomePage;
