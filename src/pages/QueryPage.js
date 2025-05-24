import SqlQuery from '../components/SqlQuery';
import { useDatabase } from '../db/DatabaseConnection';

const QueryPage = () => {
  const { executeQuery } = useDatabase();
  return <SqlQuery onExecute={executeQuery} />;
};

export default QueryPage;
