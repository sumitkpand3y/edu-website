import dotenv from 'dotenv';
import getPort from 'get-port';
dotenv.config();

import app from './app';

(async () => {
  const PORT = await getPort({ port: Number(process.env.PORT) || 7000 });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();
