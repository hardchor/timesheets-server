import express from 'express';
import { Nuts as nuts } from 'nuts-serve';

const port = process.env.EXPRESS_PORT || 4000;

const app = express();

const nutsMiddleware = nuts({
  // GitHub configuration
  repository: process.env.GITHUB_REPO,
  token: process.env.GITHUB_TOKEN,
  refreshSecret: process.env.GITHUB_SECRET,
});

app.enable('trust proxy');

app.use('/', nutsMiddleware.router);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}!`);
});
