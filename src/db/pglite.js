import { PGlite } from '@electric-sql/pglite';

let dbInstance = null;

export const getDbInstance = async () => {
  if (!dbInstance) {
    dbInstance = new PGlite('idb://patient_db');
    await dbInstance.waitReady;
  }
  return dbInstance;
};

