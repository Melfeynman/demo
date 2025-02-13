import { Client } from 'pg';

export default async () => {
  const client = new Client({
    user: 'alena',
    password: 'alena',
    host: '127.0.0.1',
    port: '5432',
    database: 'demo_js',
  });

  await client.connect();
  return client;
};