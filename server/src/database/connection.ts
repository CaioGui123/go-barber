import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Connected with database!'))
  .catch(() => console.log('Error in connection with database!'));
