import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const app = createApp();
connectDB().then(() => {
  app.listen(env.port, () => console.log(`API running on http://localhost:${env.port}`));
}).catch(err => {
  console.error('DB error', err);
  process.exit(1);
});
